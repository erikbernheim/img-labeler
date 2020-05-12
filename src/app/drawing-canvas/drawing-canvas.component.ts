import { Component, OnInit, ViewChild, Renderer2, HostListener, AfterViewInit, Output } from '@angular/core';
import * as d3 from 'd3';
import * as svg from 'save-svg-as-png';
import { PanZoomConfig, PanZoomAPI, PanZoomModel } from 'ng2-panzoom';
import { Subscription, Observable } from 'rxjs';
import * as clonedeep from 'lodash.clonedeep';
import * as potrace from 'potrace';
import * as Jimp from 'jimp';
import { PngToSvgService } from '../services/png-to-svg.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LutServiceService } from '../services/lut-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-drawing-canvas',
    templateUrl: './drawing-canvas.component.html',
    styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent implements OnInit, AfterViewInit {
    public gitImage: string;
    public imageName: string;
    public dragging = false;
    public drawing = false;
    public startPoint = [];
    public svg;
    public g;
    public isCollapsed = false;
    public points = [];
    public loadedColors: number;
    public color = '#402020';
    public colorIndex = 0;
    public history = [];
    public providedURL: string;
    public customMaskURL: string;
    public panzoomConfig: PanZoomConfig = new PanZoomConfig({
        zoomLevels: 10,
        scalePerZoomLevel: 1.5,
        zoomStepDuration: 0.2,
        freeMouseWheel: false,
        invertMouseWheel: true,
        zoomToFitZoomLevelFactor: 0.9,
        dragMouseButton: 'right',
        initialZoomLevel: 1
    });
    private panZoomAPI: PanZoomAPI;
    public panzoomModel: PanZoomModel;
    private apiSubscription: Subscription;
    private modelChangedSubscription: Subscription;
    public layers;
    public loadedMask = false;
    public layerPoints = [];
    public localStorage = [];
    public imgN = '5';
    public imgURL = 'https://raw.githubusercontent.com/commaai/comma10k/master/imgs/0005_836d09212ac1b8fa_2018-06-15--15-57-15_23_345.png';
    @ViewChild('artboard') artboard;
    @ViewChild('opacity') opacity;
    @ViewChild('imageNumber') imageNumber;
    @ViewChild('url') url;

    ngAfterViewInit(): void {
    }


    constructor(private renderer: Renderer2, private pngToSvg: PngToSvgService,
                private ngxService: NgxUiLoaderService, private lut: LutServiceService,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        const storage = Object.entries(localStorage);
        for (const item of storage) {
            if (item[0].includes('github')) {
                item[0] = item[0].match(/[\w-]+\.(png|jpg)/)[0].substring(0, 4);
                this.localStorage.push(item);
            }
        }
        this.apiSubscription = this.panzoomConfig.api.subscribe((api: PanZoomAPI) => this.panZoomAPI = api);
        this.modelChangedSubscription = this.panzoomConfig.modelChanged.subscribe((model: PanZoomModel) => {
            this.onModelChanged(model);
            this.panzoomModel = model;
        });


        this.svg = d3.select('.artboard').append('svg')
            .attr('height', 950)
            .attr('width', 1250);

        this.activatedRoute.queryParams.subscribe(params => {
                const userId = params.userId;
                if (params.imageNumber){
                    this.imgN = params.imageNumber;
                    this.updateImageByN();
                }
              });
    }

    public createLayers() {
        this.loadedColors = 0;
        this.loadedMask = true;
        this.drawing = false;
        this.svg.selectAll('*').remove();
        this.ngxService.start();
        this.isolateSingleColor(2);
        this.isolateSingleColor(0);
        this.isolateSingleColor(1);
        this.isolateSingleColor(3);
        this.isolateSingleColor(4);
    }

    public addMask() {
        this.loadedMask = true;
        this.svg.selectAll('g.existingMask').remove();
        const g = this.svg.append('g').attr('class', 'existingMask' + ' completePoly').attr('layerHidden', 'false')
        .attr('opacity', this.opacity.nativeElement.value * .01)
        .attr('visibility', 'visible');
        g.append('svg:image')
        .attr('href', this.url.nativeElement.value.replace('imgs', 'masks').replace('?raw=true', '')
        .replace('https://github.com/commaai/comma10k/blob/', 'https://raw.githubusercontent.com/commaai/comma10k/'))
        .attr('x', 43)
        .attr('y', 38);
        this.updateOpacity(50);
        this.layers = this.artboard.nativeElement.children[0].children;
    }

    private isolateSingleColor(num: number) {
        // 0 undrivable, 1 lane, 2 road, 3 movable , 4 mycar
        const colors = [[64, 32, 32], [255, 0, 0], [128, 128, 96], [0, 255, 102], [204, 0, 255]];
        let image: any;
        const maskUrl = this.url.nativeElement.value.replace('imgs', 'masks').replace('?raw=true', '')
        .replace('https://github.com/commaai/comma10k/blob/', 'https://raw.githubusercontent.com/commaai/comma10k/');
        const color = colors[num];
        Jimp.read(maskUrl)
            .then((jimpObject) => {
                jimpObject.scan(0, 0, jimpObject.bitmap.width, jimpObject.bitmap.height, (x, y, idx) => {
                    if (jimpObject.bitmap.data[idx] !== color[0] || jimpObject.bitmap.data[idx + 1] !== color[1]
                        || jimpObject.bitmap.data[idx + 2] !== color[2]) {
                        jimpObject.bitmap.data[idx] = 255;
                        jimpObject.bitmap.data[idx + 1] = 255;
                        jimpObject.bitmap.data[idx + 2] = 255;
                    }
                });
                image = jimpObject;
            }).then(i => image.getBase64(Jimp.AUTO, (err, res) => {
                const trace = new potrace.Potrace({ optiCurve: false, alphaMax: 0.0, turdSize: 0 });

                trace.loadImage(res, error => {
                    this.addShape(trace.getSVG(), num);
                });
            }));
    }

    private addShape(shape: string, num: number) {
        const parser = new DOMParser();
        const doc: any = parser.parseFromString(shape, 'image/svg+xml');
        const path = doc.children[0].children[0].getAttribute('d');
        const points = this.pngToSvg.svgPathToPolygons(path, { tolerance: 100000, decimals: 8 });
        let arrIndex = -1;
        let arrIndex1 = 0;
        const childPolys = [];
        for (const poly of points) {
            poly.forEach(element => {
                element[0] += 43;
                element[1] += 38;
             });
        }
        for (const poly of points) {
            arrIndex++;
            for (const j of points) {
                if (this.pngToSvg.pointInPoly(poly[0], j)  && (poly !== j)) { childPolys.push(arrIndex); break; }
             }
        }
        for (const poly of points) {
           this.points = poly;
           this.changeColor(num);
           if (childPolys.includes(arrIndex1)) {this.closePolygon(true); } else {
            this.closePolygon();
           }
           arrIndex1++;
        }
        this.checkLoader();
    }

    private checkLoader() {
        if (this.loadedColors > 3) {
            this.arrangeShapes();
            this.ngxService.stop();
        } else {
            this.loadedColors++;
        }
    }

    private arrangeShapes() {
        const polys = this.svg.selectAll('.child > polygon');
        polys._groups[0].forEach(element => {
        const points = element.getAttribute('points');
        const layers = this.svg.selectAll('[points="' + points + '"]');
        layers._groups.forEach(layer => {
                if ( layer.length === 2) {
                    for (const indiLayer of layer) {
                        if (!indiLayer.parentElement.className.baseVal.includes('child')) {
                            this.artboard.nativeElement.children[0].append(indiLayer.parentElement);
                        } else {
                            indiLayer.parentElement.remove();
                        }
                    }
                }
            });
        });
        this.svg.selectAll('.child').remove();
    }

    public mouseUp(e) {
        if (this.g) {
            this.addToHistory(this.drawing, this.startPoint, this.g, this.points);
        }
        this.g = this.svg.select('g.drawPoly');
        if (e.button !== 0) { return; }
        if (this.dragging) { return; }
        this.drawing = true;
        this.startPoint = [(e.layerX - this.panzoomModel.pan.x) *
            (1 / (this.artboard.nativeElement.getBoundingClientRect().width / this.artboard.nativeElement.offsetWidth)),
            (e.layerY - this.panzoomModel.pan.y) *
            (1 / (this.artboard.nativeElement.getBoundingClientRect().width / this.artboard.nativeElement.offsetWidth))];
        if (this.svg.select('g.drawPoly').empty()) {
            this.g = this.svg.append('g').attr('class', 'drawPoly');
            this.svg.selectAll('circle').attr('cursor', 'default');
        }
        if (e.toElement.tagName === 'circle') {
            this.closePolygon();
            return;
        }
        this.points.push([(e.layerX - this.panzoomModel.pan.x) *
            (1 / (this.artboard.nativeElement.getBoundingClientRect().width / this.artboard.nativeElement.offsetWidth)),
            (e.layerY - this.panzoomModel.pan.y) *
            (1 / (this.artboard.nativeElement.getBoundingClientRect().width / this.artboard.nativeElement.offsetWidth))]);
        this.svg.select('g.drawPoly').append('polyline').attr('points', this.points)
            .style('fill', 'none')
            .attr('stroke-width', 1 / (this.panzoomModel.zoomLevel / 2))
            .attr('stroke', '#000');
        this.svg.select('g.drawPoly').append('circle')
            .attr('cx', this.points[this.points.length - 1][0])
            .attr('cy', this.points[this.points.length - 1][1])
            .attr('r', 4 / (this.panzoomModel.zoomLevel / 1.5))
            .attr('stroke-width', 1 / (this.panzoomModel.zoomLevel / 2))
            .attr('fill', 'yellow')
            .attr('stroke', '#000')
            .attr('is-handle', 'true')
            .attr('class', 'inProgressCircle')
            .attr('style', 'cursor:pointer');
    }
    public closePolygon(childPoly?: boolean) {
        this.addToHistory(this.drawing, this.startPoint, this.g, this.points);
        let child = '';
        if (childPoly) {
            child = ' child';
        }
        this.svg.selectAll('circle').attr('cursor', 'move');
        this.svg.select('g.drawPoly').remove();
        const g = this.svg.append('g').attr('class', this.color + ' completePoly' + child).attr('layerHidden', 'false')
            .attr('opacity', this.opacity.nativeElement.value * .01)
            .attr('visibility', 'visible');
        g.append('polygon')
            .attr('points', this.points)
            .attr('shape-rendering', 'crispEdges')
            .style('fill', this.color);
        for (const point of this.points) {
            const holder = this;
            g.selectAll('circles')
                .data([point])
                .enter()
                .append('circle')
                .attr('cx', point[0])
                .attr('cy', point[1])
                .attr('r', 4 / this.panzoomModel.zoomLevel)
                .attr('stroke-width', 1 / (this.panzoomModel.zoomLevel / 2))
                .attr('fill', '#FDBC07')
                .attr('stroke', '#000')
                .attr('is-handle', 'true')
                .attr('class', 'dragCircle')
                .attr('cursor', 'move')
                .call(d3.drag()
                    .on('drag', function() {
                        holder.handleDrag(this);
                    })
                    .on('end', () => {
                        this.dragging = false;
                        this.addToHistory(this.drawing, this.startPoint, this.g, this.points);
                    })
                );

        }
        this.points.splice(0);
        this.drawing = false;
        this.layers = this.artboard.nativeElement.children[0].children;
        this.addToLocalStorage();
    }

    public enableDragging() {
        const holder = this;
        this.svg.selectAll('.dragCircle').call(d3.drag()
            .on('drag', function() {
                holder.handleDrag(this);
            })
            .on('end', () => {
                this.dragging = false;
                this.addToHistory(this.drawing, this.startPoint, this.g, this.points);
            })
        );
    }
    public mouseMove(e) {
        if (!this.drawing) { return; }
        const g = d3.select('g.drawPoly');
        if (e.target.tagName === 'line') { return; }
        if (e.target.className.baseVal === 'inProgressCircle') {
            g.select('line').remove();
            return;
        }
        g.select('line').remove();
        g.append('line')
            .attr('x1', this.startPoint[0])
            .attr('y1', this.startPoint[1])
            .attr('x2', (e.layerX - this.panzoomModel.pan.x) *
                (1 / (this.artboard.nativeElement.getBoundingClientRect().width / this.artboard.nativeElement.offsetWidth)))
            .attr('y2', (e.layerY - this.panzoomModel.pan.y) *
                (1 / (this.artboard.nativeElement.getBoundingClientRect().width / this.artboard.nativeElement.offsetWidth)))
            .attr('stroke', '#53DBF3')
            .attr('stroke-width', 1 / (this.panzoomModel.zoomLevel * 1.3));
    }

    public handleDrag(e) {
        if (this.drawing) { return; }
        const newPoints = [];
        let circle;
        this.dragging = true;
        const poly = d3.select(e.parentNode).select('polygon');
        const circles = d3.select(e.parentNode).selectAll('circle');
        e.setAttribute('cy', d3.event.y);
        e.setAttribute('cx', d3.event.x);
        for (const circleGroup of circles._groups[0]) {
            circle = d3.select(circleGroup);
            newPoints.push([circle.attr('cx'), circle.attr('cy')]);
        }
        poly.attr('points', newPoints);
    }

    public updateOpacity(val?: number): void {
        this.addToHistory(this.drawing, this.startPoint, this.g, this.points);
        this.svg.selectAll('.completePoly').attr('opacity', this.opacity.nativeElement.value * .01);
        if (val) {
            this.svg.selectAll('.completePoly').attr('opacity', val * .01);
            this.opacity.nativeElement.value = val;
        }
    }

    public incrementOpacity(up: boolean): void {
        if (up) {
            this.opacity.nativeElement.value =  Math.min(parseInt(this.opacity.nativeElement.value, 10) + 20, 100);
        } else {
            this.opacity.nativeElement.value =  Math.max(parseInt(this.opacity.nativeElement.value, 10) - 20, 0);
        }
        this.updateOpacity();
    }

    public save(): void {
        const holder = this;
        if (this.loadedMask === false) {
        this.svg.selectAll('.completePoly').attr('opacity', 1);
        this.svg.selectAll('.completePoly').attr('visibility', 'visible');
        this.svg.selectAll('circle').attr('opacity', 0);
        this.svg.insert('polygon', ':first-child').attr('class', 'background').style('fill', '#808060')
            .attr('points', '0,0,0,950,1250,950,1250,0').attr('shape-rendering', 'crispEdges');
        svg.saveSvgAsPng(this.artboard.nativeElement.children[0], this.url.nativeElement.value.match(/[\w-]+\.(png|jpg)/)[0]
            .replace(/.(png|jpg)/, ''), { width: 1164, height: 874, top: 38, left: 43, encoderOptions: 0.0 }).then(
                () => {
                    this.svg.selectAll('.completePoly').attr('opacity', this.opacity.nativeElement.value * .01);
                    this.svg.selectAll('circle').attr('opacity', 1);
                    this.svg.selectAll('.background').remove();
                }
            );
        } else {
            let maskUrl = this.url.nativeElement.value.replace('imgs', 'masks').replace('?raw=true', '')
            .replace('https://github.com/commaai/comma10k/blob/', 'https://raw.githubusercontent.com/commaai/comma10k/');
            if (this.customMaskURL) { maskUrl = this.customMaskURL; }
            this.svg.selectAll('.completePoly').attr('opacity', 1);
            this.svg.selectAll('.completePoly').attr('visibility', 'visible');
            this.svg.selectAll('circle').attr('opacity', 0);
            svg.svgAsPngUri(this.artboard.nativeElement.children[0], { width: 1164, height: 874, top: 38, left: 43, encoderOptions: 0.0 })
            .then( uri => {
                Jimp.read(maskUrl, (err, originalMask) => {
                    Jimp.read(uri, (err, image) => {
                        originalMask.composite( image, 0, 0 );
                        holder.downloadImage(originalMask);
                    });
                });
                this.svg.selectAll('.completePoly').attr('opacity', this.opacity.nativeElement.value * .01);
                this.svg.selectAll('circle').attr('opacity', 1);
                    }
                );
        }
    }

    public base64ToGit(): void {
        const holder = this;
        this.imageName = this.url.nativeElement.value.match(/[\w-]+\.(png|jpg)/)[0];
        if (this.loadedMask === false) {
        this.svg.selectAll('.completePoly').attr('opacity', 1);
        this.svg.selectAll('.completePoly').attr('visibility', 'visible');
        this.svg.selectAll('circle').attr('opacity', 0);
        this.svg.insert('polygon', ':first-child').attr('class', 'background').style('fill', '#808060')
            .attr('points', '0,0,0,950,1250,950,1250,0').attr('shape-rendering', 'crispEdges');
        svg.svgAsPngUri(this.artboard.nativeElement.children[0],
            { width: 1164, height: 874, top: 38, left: 43, encoderOptions: 0.0 }).then(
                (image) => {
                    this.gitImage = image;
                    this.svg.selectAll('.completePoly').attr('opacity', this.opacity.nativeElement.value * .01);
                    this.svg.selectAll('circle').attr('opacity', 1);
                    this.svg.selectAll('.background').remove();
                }
            );
        } else {
            let maskUrl = this.url.nativeElement.value.replace('imgs', 'masks').replace('?raw=true', '')
            .replace('https://github.com/commaai/comma10k/blob/', 'https://raw.githubusercontent.com/commaai/comma10k/');
            if (this.customMaskURL) { maskUrl = this.customMaskURL; }
            this.svg.selectAll('.completePoly').attr('opacity', 1);
            this.svg.selectAll('.completePoly').attr('visibility', 'visible');
            this.svg.selectAll('circle').attr('opacity', 0);
            svg.svgAsPngUri(this.artboard.nativeElement.children[0], { width: 1164, height: 874, top: 38, left: 43, encoderOptions: 0.0 })
            .then( uri => {
                Jimp.read(maskUrl, (err, originalMask) => {
                    Jimp.read(uri, (err, image) => {
                        originalMask.composite( image, 0, 0 );
                        holder.setBase64(originalMask);
                    });
                });
                this.svg.selectAll('.completePoly').attr('opacity', this.opacity.nativeElement.value * .01);
                this.svg.selectAll('circle').attr('opacity', 1);
                    }
                );
        }
    }

    public downloadImage(image) {
        image.getBase64(Jimp.AUTO, (err, res) => {
            const download = document.createElement('a');
            download.href = res;
            download.download = this.url.nativeElement.value.match(/[\w-]+\.(png|jpg)/)[0];
            download.click();
        });
    }

    public setBase64(image) {
        image.getBase64(Jimp.AUTO, (err, res) => {
            this.gitImage = res;
        });
    }
    public changeColor(id: number): void {
        const colors = ['#402020', '#ff0000', '#808060', '#00ff66', '#cc00ff'];
        this.color = colors[id];
        this.colorIndex = id;
    }

    public updateImage(url?): void {
        if (url) { this.svg.style('background-image', `url('${url}')`); } else {
            this.svg.style('background-image', `url('${this.url.nativeElement.value}')`);
            this.imageNumber.nativeElement.value = this.url.nativeElement.value.match(/[\w-]+\.(png|jpg)/)[0].substring(0, 4);
        }
    }

    private updateImageByN(): void {
        this.imgN = this.imgN.padStart(4, '0');
        this.svg.style('background-image', `url('https://raw.githubusercontent.com/commaai/comma10k/master/imgs/${this.lut.getUrl(this.imgN)}')`);
        this.imgURL = `https://raw.githubusercontent.com/commaai/comma10k/master/imgs/${this.lut.getUrl(this.imgN)}`;
    }

    public updateImageByNumber(): void {
        this.imgN = this.imageNumber.nativeElement.value;
        this.updateImageByN();
    }

    onModelChanged(model: PanZoomModel): void {
        if (this.artboard && model.zoomLevel >= 1) {
            this.svg.selectAll('circle').attr('r', 4 / (model.zoomLevel / 1.5));
            this.svg.selectAll('polyline').attr('stroke-width', 1 / (model.zoomLevel / 2));
            this.svg.selectAll('circle').attr('stroke-width', 1 / (model.zoomLevel / 2));
        }
    }

    public addToHistory(drawing, startPoint, g, points): void {
        const collection = this.artboard.nativeElement.children[0].innerHTML;
        this.history.unshift([JSON.stringify(collection), JSON.stringify(drawing),
        JSON.stringify(startPoint), clonedeep(g), JSON.stringify(points)]);
        if (this.history.length > 15) {
            this.history.pop();
        }
    }

    public addToLocalStorage(): void {
        const collection = this.artboard.nativeElement.innerHTML;
        const contents = JSON.stringify({
            artboard: JSON.stringify(collection),
            url: this.url.nativeElement.value,
            opacity: this.opacity.nativeElement.value
        });
        localStorage.setItem(this.url.nativeElement.value, contents);
    }

    public revertFromLocalStorage(collection: string): void {
        this.deleteCurrentLayer();
        const contents = JSON.parse(collection);
        this.artboard.nativeElement.innerHTML = JSON.parse(contents.artboard);
        this.svg = d3.select('svg');
        this.updateOpacity();
        this.url.nativeElement.value = contents.url;
        this.enableDragging();
        this.layers = this.artboard.nativeElement.children[0].children;
    }

    public undo(): void {
        if (this.history.length > 0) {
            this.artboard.nativeElement.children[0].innerHTML = JSON.parse(this.history[0][0]);
            this.drawing = JSON.parse(this.history[0][1]);
            this.startPoint = JSON.parse(this.history[0][2]);
            this.g = this.history[0][3];
            this.points = JSON.parse(this.history[0][4]);
            this.history.shift();
        }
        this.enableDragging();
    }

    public toFront(i: number) {
        this.artboard.nativeElement.children[0].append(this.artboard.nativeElement.children[0].children[i]);
    }

    public toBottom(i: number) {
        this.artboard.nativeElement.children[0].prepend(this.artboard.nativeElement.children[0].children[i]);
    }

    public toggleVisibility(i: number) {
        if (this.artboard.nativeElement.children[0].children[i].getAttribute('visibility') !== 'hidden') {
            this.artboard.nativeElement.children[0].children[i].setAttribute('visibility', 'hidden');
            this.artboard.nativeElement.children[0].children[i].setAttribute('layerHidden', 'true');
            return;
        }
        this.artboard.nativeElement.children[0].children[i].setAttribute('visibility', 'visible');
        this.artboard.nativeElement.children[0].children[i].setAttribute('layerHidden', 'false');
    }

    public toggleAll(): void {
        if (this.getVisibility(0)) {
            for (const layer of this.layers) {
                layer.setAttribute('visibility', 'hidden');
                layer.setAttribute('layerHidden', 'true');
            }
        } else {
            for (const layer of this.layers) {
                layer.setAttribute('visibility', 'visible');
                layer.setAttribute('layerHidden', 'false');
            }
        }
    }

    public getVisibility(i: number): boolean {
        if (this.artboard.nativeElement.children[0].children[i].getAttribute('visibility') === 'visible') {
            return true;
        }
        return false;
    }

    public deleteLayer(i: number) {
        if (this.getLayerType(i) === 'Existing Mask') {
            this.loadedMask = false;
        }
        this.artboard.nativeElement.children[0].children[i].remove();
    }

    public deleteAllLayers() {
        if (this.drawing) { return; }
        if (confirm('Warning: This will remove all current layers')) {
        this.svg.selectAll('g').remove();
        }
    }

    public deleteCurrentLayer() {
        if (!this.drawing) { return; }
        this.drawing = false;
        this.startPoint = [];
        this.points = [];
        this.svg.select('g.drawPoly').remove();
    }

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.code === 'KeyR') { this.changeColor(0); }
        if (event.code === 'KeyL') { this.changeColor(1); }
        if (event.code === 'KeyU') { this.changeColor(2); }
        if (event.code === 'KeyM') { this.changeColor(3); }
        if (event.code === 'KeyC') { this.changeColor(4); }
        if (event.code === 'Escape') { this.deleteCurrentLayer(); }
        if (event.code === 'ArrowUp') { this.incrementOpacity(true); event.preventDefault(); }
        if (event.code === 'ArrowDown') { this.incrementOpacity(false); event.preventDefault(); }
        if (event.code === 'KeyZ' && event.ctrlKey === true) { this.undo(); }
        if (event.code === 'Comma') { this.toggleAll  (); }

    }

    public getLayerType(i: number): string {

        const colors = [['#402020 completePoly', 'Road'], ['#ff0000 completePoly', 'Lane Markings'], ['#808060 completePoly', 'Undrivable'],
        ['#00ff66 completePoly', 'Movable'], ['#cc00ff completePoly', 'My Car'], ['existingMask completePoly', 'Existing Mask']];
        for (const color of colors) {
            if (color[0] === this.artboard.nativeElement.children[0].children[i].getAttribute('class')) {
                return color[1];
            }
        }
        return 'In Progress';
    }

    public reset(): void {
        if (confirm('This will reset your entire document. Continue?')) {
            location.reload();
        }
    }

    public loadMaskFromURL(): void {
        this.customMaskURL =  prompt('Enter Mask URL').valueOf().replace('imgs', 'masks').replace('?raw=true', '')
        .replace('https://github.com', 'https://raw.githubusercontent.com').replace('/blob', '');
        this.loadedMask = true;
        const g = this.svg.append('g').attr('class', 'existingMask' + ' completePoly').attr('layerHidden', 'false')
        .attr('opacity', this.opacity.nativeElement.value * .01)
        .attr('visibility', 'visible');
        g.append('svg:image')
        .attr('href', this.customMaskURL)
        .attr('x', 43)
        .attr('y', 38);
        this.url.nativeElement.value = 'https://raw.githubusercontent.com/commaai/comma10k/master/imgs/' +
        this.customMaskURL.match(/[\w-]+\.(png|jpg)/)[0];
        this.layers = this.artboard.nativeElement.children[0].children;
        this.updateImage();
    }

}
