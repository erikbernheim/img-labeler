import { Component, OnInit, ViewChild, Renderer2, HostListener, AfterViewInit, Output } from '@angular/core';
import * as d3 from 'd3';
import * as svg from 'save-svg-as-png';
import { PanZoomConfig, PanZoomAPI, PanZoomModel } from 'ng2-panzoom';
import { Subscription, Observable } from 'rxjs';
import * as cloneDeep from 'node_modules/lodash.clonedeep';
import * as potrace from 'potrace';
import * as Jimp from 'jimp';
import { PngToSvgService } from '../services/png-to-svg.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LutServiceService } from '../services/lut-service.service';
import { ActivatedRoute } from '@angular/router';
import { MaskingService } from '../services/masking.service';
import { Layer } from '../models/layer';
import { SvgtopngService } from '../services/svgtopng.service';
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
    @ViewChild('artboard') artboard;
    public opacity: number = 100;
    @ViewChild('imageNumber') imageNumber;
    @ViewChild('url') url;
    @Output() Layers;

    ngAfterViewInit(): void {
        this.maskSvc.setArtboard(this.artboard.nativeElement.innerHTML);
        this.setLayers();

    }


    constructor(private renderer: Renderer2, private pngToSvg: PngToSvgService,
        private ngxService: NgxUiLoaderService, private lut: LutServiceService,
        private activatedRoute: ActivatedRoute, private maskSvc: MaskingService,
        private svgToPng: SvgtopngService) { }

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
        });

        this.maskSvc.getImageUrl().subscribe(url => {
            this.svg.style('background-image', `url('${url}')`);
        })

        this.maskSvc.getMaskUrl().subscribe(url => {
            this.loadedMask = true;
            this.svg.selectAll('.existingMask').remove();
            const g = this.svg.append('g').attr('class', 'existingMask' + ' completePoly').attr('layerHidden', 'false')
                .attr('opacity', this.opacity)
                .attr('visibility', 'visible');
            g.append('svg:image')
                .attr('href', url)
                .attr('x', 43)
                .attr('y', 38);
        })

        this.maskSvc.getLayerChange().subscribe(obj => {
            if (obj.type === 'delete') {
                this.deleteLayer(obj.index);
            }
            if (obj.type === 'up') {
                this.toFront(obj.index);
            }
            if (obj.type === 'down') {
                this.toBottom(obj.index);
            }
            if (obj.type === 'toggle') {
                this.toggleVisibility(obj.index);
            }
            if (obj.type === 'opacity') {
                this.svg.selectAll('.completePoly').attr('opacity', obj.index * .01);
                this.opacity = obj.index * .01;
            }
            if (obj.type === 'clearAll') {
                this.deleteAllLayers();
            }
            if (obj.type === 'revert') {
                this.revertFromLocalStorage(obj.collection);
            }
            if (obj.type === 'toggleAll') {
                this.toggleAll();
            }
            this.setLayers();
        })

    }



    // NEW METHODS!!!!

    private setLayers(): void {
        this.maskSvc.updateMask({ d3: this.svg, dom: this.artboard.nativeElement, loadedMask: this.loadedMask });
    }

    //OLD METHODS

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
        const g = this.svg.append('g').attr('class', this.maskSvc.currentColor.color + ' completePoly' + child).attr('layerHidden', 'false')
            .attr('opacity', this.opacity)
            .attr('visibility', 'visible');
        g.append('polygon')
            .attr('points', this.points)
            .attr('shape-rendering', 'crispEdges')
            .style('fill', this.maskSvc.currentColor.color);
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
                    .on('drag', function () {
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
        this.setLayers();
        this.addToLocalStorage();
    }

    public enableDragging() {
        const holder = this;
        this.svg.selectAll('.dragCircle').call(d3.drag()
            .on('drag', function () {
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

    public incrementOpacity(up: boolean): void {
        if (up) {
            this.opacity = Math.min(this.opacity + 20, 100);
        } else {
            this.opacity = Math.max(this.opacity - 20, 0);
        }
        // this.updateOpacity();
    }

    

    public updateImage(url?): void {
        if (url) { this.svg.style('background-image', `url('${url}')`); } else {
            this.svg.style('background-image', `url('${this.url.nativeElement.value}')`);
            this.imageNumber.nativeElement.value = this.url.nativeElement.value.match(/[\w-]+\.(png|jpg)/)[0].substring(0, 4);
        }
    }

    public updateImageByNumber(): void {
        this.svg.style('background-image', `url('https://raw.githubusercontent.com/commaai/comma10k/master/imgs/${this.lut.getUrl(this.imageNumber.nativeElement.value.padStart(4, '0'))}')`);
        this.url.nativeElement.value = `https://raw.githubusercontent.com/commaai/comma10k/master/imgs/${this.lut.getUrl(this.imageNumber.nativeElement.value.padStart(4, '0'))}`;
        this.imageNumber.nativeElement.value = this.imageNumber.nativeElement.value.padStart(4, '0');
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
        JSON.stringify(startPoint), cloneDeep(g), JSON.stringify(points)]);
        if (this.history.length > 15) {
            this.history.pop();
        }
    }

    public addToLocalStorage(): void {
        const collection = this.artboard.nativeElement.innerHTML;
        const contents = JSON.stringify({
            artboard: JSON.stringify(collection),
            url: this.maskSvc.currentUrl,
            opacity: this.opacity
        });
        localStorage.setItem(this.maskSvc.currentUrl, contents);
    }

    public revertFromLocalStorage(collection: string): void {
        this.deleteAllLayers();
        const contents = JSON.parse(collection);
        this.artboard.nativeElement.innerHTML = JSON.parse(contents.artboard);
        this.svg = d3.select('svg');
        this.maskSvc.currentUrl = contents.url;
        this.enableDragging();
        this.setLayers();
        this.loadedMask = this.maskSvc.loadedMask();
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
        this.setLayers();
    }

    public toggleAll(): void {
        if (this.getVisibility(0)) {
            for (const layer of this.artboard.nativeElement.children[0].children) {
                layer.setAttribute('visibility', 'hidden');
                layer.setAttribute('layerHidden', 'true');
            }
        } else {
            for (const layer of this.artboard.nativeElement.children[0].children) {
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
        if (event.code === 'Escape') { this.deleteCurrentLayer(); }
        if (event.code === 'KeyZ' && event.ctrlKey === true) { this.undo(); }

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



}
