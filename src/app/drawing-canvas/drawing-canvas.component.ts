import { Component, OnInit, ViewChild, Renderer2, HostListener, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import * as svg from 'save-svg-as-png';
import { PanZoomConfig, PanZoomAPI, PanZoomModel } from 'ng2-panzoom';
import { Subscription, Observable } from 'rxjs';
import * as cloneDeep from 'lodash.cloneDeep';


@Component({
    selector: 'app-drawing-canvas',
    templateUrl: './drawing-canvas.component.html',
    styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent implements OnInit, AfterViewInit {
    public dragging = false;
    public drawing = false;
    public startPoint = [];
    public svg;
    public g;
    public isCollapsed = false;
    public points = [];
    public color = '#402020';
    public colorIndex = 0;
    public history = [];
    public providedURL: string;
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
    public localStorage = [];
    @ViewChild('artboard') artboard;
    @ViewChild('opacity') opacity;
    @ViewChild('url') url;
    ngAfterViewInit(): void {
    }


    constructor(private renderer: Renderer2) { }

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
    }

    public mouseUp(e) {
        if (this.g) {
            this.addToHistory(this.drawing, this.startPoint, this.g, this.points);
        }
        this.g = this.svg.select('g.drawPoly');
        if (e.button !== 0) { return; }
        if (this.dragging) { return; }
        this.drawing = true;
        this.startPoint = [e.offsetX, e.offsetY];
        if (this.svg.select('g.drawPoly').empty()) { this.g = this.svg.append('g').attr('class', 'drawPoly'); }
        if (e.toElement.tagName === 'circle') {
            this.closePolygon();
            return;
        }
        this.points.push([e.offsetX, e.offsetY]);
        this.svg.select('g.drawPoly').append('polyline').attr('points', this.points)
            .style('fill', 'none')
            .attr('stroke-width', 1 / (this.panzoomModel.zoomLevel / 2))
            .attr('stroke', '#000');
        this.svg.select('g.drawPoly').append('circle')
            .attr('cx', this.points[this.points.length - 1][0])
            .attr('cy', this.points[this.points.length - 1][1])
            .attr('r', 4 / this.panzoomModel.zoomLevel)
            .attr('stroke-width', 1 / (this.panzoomModel.zoomLevel / 2))
            .attr('fill', 'yellow')
            .attr('stroke', '#000')
            .attr('is-handle', 'true')
            .attr('style', 'cursor:pointer');
    }
    public closePolygon() {
        this.addToHistory(this.drawing, this.startPoint, this.g, this.points);
        this.svg.select('g.drawPoly').remove();
        const g = this.svg.append('g').attr('class', this.color + ' completePoly').attr('layerHidden', 'false')
            .attr('opacity', this.opacity.nativeElement.value * .01);
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
                    .on('end', () => { this.dragging = false; })
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
        .on('end', () => { this.dragging = false; })
    );
    }
    public mouseMove(e) {
        if (!this.drawing) { return; }
        const g = d3.select('g.drawPoly');
        if (e.target.tagName === 'circle') {
            g.select('line').remove();
            return;
        }
        if (e.target.tagName !== 'svg') {
            return;
        }
        g.select('line').remove();
        g.append('line')
            .attr('x1', this.startPoint[0])
            .attr('y1', this.startPoint[1])
            .attr('x2', e.offsetX)
            .attr('y2', e.offsetY)
            .attr('stroke', '#53DBF3')
            .attr('stroke-width', 1 / (this.panzoomModel.zoomLevel * 1.3));
    }

    public handleDrag(e) {
        this.addToHistory(this.drawing, this.startPoint, this.g, this.points);
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

    public updateOpacity(): void {
        this.addToHistory(this.drawing, this.startPoint, this.g, this.points);

        this.svg.selectAll('.completePoly').attr('opacity', this.opacity.nativeElement.value * .01);

    }

    public save(): void {
        this.svg.selectAll('.completePoly').attr('opacity', 1);
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
    }
    public changeColor(id: number): void {
        const colors = ['#402020', '#ff0000', '#808060', '#00ff66', '#cc00ff'];
        this.color = colors[id];
        this.colorIndex = id;
    }

    public updateImage(url?): void {
        if (url) { this.svg.style('background-image', `url('${url}')`); } else {
            this.svg.style('background-image', `url('${this.url.nativeElement.value}')`);
        }
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
            url: this.url.nativeElement.value,
            opacity: this.opacity.nativeElement.value
        } );
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
        if (this.artboard.nativeElement.children[0].children[i].getAttribute('opacity') !== '0') {
            this.artboard.nativeElement.children[0].children[i].setAttribute('opacity', '0');
            this.artboard.nativeElement.children[0].children[i].setAttribute('layerHidden', 'true');
            return;
        }

        this.artboard.nativeElement.children[0].children[i].setAttribute('opacity', this.opacity.nativeElement.value * .01);
        this.artboard.nativeElement.children[0].children[i].setAttribute('layerHidden', 'false');

    }

    public getVisibility(i: number): boolean {
        if (this.artboard.nativeElement.children[0].children[i].getAttribute('opacity') !== '0') {
            return true;
        }
        return false;
    }

    public deleteLayer(i: number) {
        this.artboard.nativeElement.children[0].children[i].remove();
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
        if (event.code === 'KeyZ' && event.ctrlKey === true) { this.undo(); }
    }

    public getLayerType(i: number): string {

        const colors = [['#402020 completePoly', 'Road'], ['#ff0000 completePoly', 'Lane Markings'], ['#808060 completePoly', 'Undrivable'],
        ['#00ff66 completePoly', 'Movable'], ['#cc00ff completePoly', 'My Car']];
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

}
