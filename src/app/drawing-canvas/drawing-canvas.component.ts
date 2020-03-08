import { Component, OnInit, ViewChild, Renderer2, HostListener, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import * as svg from 'save-svg-as-png';
import { PanZoomConfig, PanZoomAPI, PanZoomModel } from 'ng2-panzoom';
import { Subscription } from 'rxjs';
import * as cloneDeep from 'lodash.cloneDeep';


@Component({
    selector: 'app-drawing-canvas',
    templateUrl: './drawing-canvas.component.html',
    styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
     //   if(localStorage.getItem('artboard')){
     //       this.artboard.nativeElement.children[0].innerHTML = JSON.parse(localStorage.getItem('artboard'))
     //       this.layers = this.artboard.nativeElement.children[0].children;
     //       this.opacity.nativeElement.value = localStorage.getItem('opacity');
     //       this.providedURL = localStorage.getItem('url');
     //       this.drawing = false;
     //   }
     //   else{
     //       this.providedURL = 'https://raw.githubusercontent.com/commaai/comma10k/master/imgs/0005_836d09212ac1b8fa_2018-06-15--15-57-15_23_345.png'
     //   }
  //      this.updateImage(this.providedURL)
    }
 

    constructor(private renderer: Renderer2) { }
    public dragging = false;
    public drawing = false;
    public startPoint = [];
    public svg;
    public g;
    public isCollapsed = false;
    public points = []
    public color: string = '#402020';
    public colorIndex: number = 0;
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
    @ViewChild('artboard') artboard;
    @ViewChild('opacity') opacity;
    @ViewChild('url') url;

    ngOnInit(): void {
        
        this.apiSubscription = this.panzoomConfig.api.subscribe((api: PanZoomAPI) => this.panZoomAPI = api);
        this.modelChangedSubscription = this.panzoomConfig.modelChanged.subscribe((model: PanZoomModel) => {
            this.onModelChanged(model);
            this.panzoomModel = model;
        });
      

        this.svg = d3.select('.artboard').append('svg')
            .attr('height', 950)
            .attr('width', 1250)
    }

    public mouseUp(e) {
        if (this.g) {
            this.addToHistory(this.drawing, this.startPoint, this.g, this.points);
        }
        this.g = this.svg.select('g.drawPoly');
         if (e.button != 0) return
         if (this.dragging) return;
        this.drawing = true;
        this.startPoint = [e.offsetX, e.offsetY];
        if (this.svg.select('g.drawPoly').empty()) this.g = this.svg.append('g').attr('class', 'drawPoly');
        if (e.toElement.tagName == 'circle') {
            this.closePolygon();
            return;
        };
        this.points.push([e.offsetX, e.offsetY]);

        var polyline = this.svg.select('g.drawPoly').append('polyline').attr('points', this.points)
            .style('fill', 'none')
            .attr('stroke-width', 1 / (this.panzoomModel.zoomLevel/2))
            .attr('stroke', '#000');
        this.svg.select('g.drawPoly').append('circle')
            .attr('cx', this.points[this.points.length - 1][0])
            .attr('cy', this.points[this.points.length - 1][1])
            .attr('r', 4 / this.panzoomModel.zoomLevel)
            .attr('stroke-width', 1 / (this.panzoomModel.zoomLevel/2))
            .attr('fill', 'yellow')
            .attr('stroke', '#000')
            .attr('is-handle', 'true')
            .attr('style', "cursor:pointer");
    };
    public closePolygon() {
        this.addToHistory(this.drawing, this.startPoint, this.g, this.points);
        this.svg.select('g.drawPoly').remove();
        var g = this.svg.append('g').attr('class', this.color + ' completePoly').attr('layerHidden', 'false').attr('opacity', this.opacity.nativeElement.value * .01);
        g.append('polygon')
            .attr('points', this.points)
            .attr('shape-rendering', 'crispEdges')
            .style('fill', this.color);
        for (var i = 0; i < this.points.length; i++) {
            let holder = this;
            var circle = g.selectAll('circles')
                .data([this.points[i]])
                .enter()
                .append('circle')
                .attr('cx', this.points[i][0])
                .attr('cy', this.points[i][1])
                .attr('r', 4 / this.panzoomModel.zoomLevel)
                .attr('stroke-width', 1 / (this.panzoomModel.zoomLevel/2))
                .attr('fill', '#FDBC07')
                .attr('stroke', '#000')
                .attr('is-handle', 'true')
                .attr('cursor', 'move')
                .attr('onClick', 'console.log("test")')
                .call(d3.drag()
                    .on('drag', function () {
                        holder.handleDrag(this);
                    })
                    .on("end", () => { this.dragging = false })
                );

        }
        this.points.splice(0);
        this.drawing = false;
        this.addToLocalStorage();
        this.layers = this.artboard.nativeElement.children[0].children;
    }
    public mouseMove(e) {
        if (!this.drawing) return;
        var g = d3.select('g.drawPoly');
        if (e.target.tagName == 'circle') {
            g.select('line').remove();
            return;
        }
        if (e.target.tagName != 'svg') {
            return;
        }
        g.select('line').remove();

        var line = g.append('line')
            .attr('x1', this.startPoint[0])
            .attr('y1', this.startPoint[1])
            .attr('x2', e.offsetX)
            .attr('y2', e.offsetY)
            .attr('stroke', '#53DBF3')
            .attr('stroke-width', 1/ (this.panzoomModel.zoomLevel * 1.3));
    }

    public handleDrag(e) {
        this.addToHistory(this.drawing, this.startPoint, this.g, this.points);
        if (this.drawing) return;
        var newPoints = [], circle;
        this.dragging = true;
        var poly = d3.select(e.parentNode).select('polygon');
        var circles = d3.select(e.parentNode).selectAll('circle');
        e.setAttribute('cy', d3.event.y);
        e.setAttribute('cx', d3.event.x);
        for (var i = 0; i < circles._groups[0].length; i++) {
            circle = d3.select(circles._groups[0][i]);
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
        this.svg.insert("polygon",":first-child").attr('class', 'background').style('fill', '#808060').attr('points','0,0,0,950,1250,950,1250,0').attr('shape-rendering', 'crispEdges');
        svg.saveSvgAsPng(this.artboard.nativeElement.children[0], this.url.nativeElement.value.split('/').pop(), { width: 1164, height: 874, top: 38, left: 43, encoderOptions: 0.0 }).then(
            () => {
                this.svg.selectAll('.completePoly').attr('opacity', this.opacity.nativeElement.value * .01);
                this.svg.selectAll('circle').attr('opacity', 1);
                this.svg.selectAll('.background').remove();
            }
        );



    }
    public changeColor(id: number): void {
        let colors = ['#402020', '#ff0000', '#808060', '#00ff66', '#cc00ff']
        this.color = colors[id];
        this.colorIndex = id;
    }

    public updateImage(url?): void {
        console.log(url)
       if(url){ this.svg.style('background-image', `url('${url}')`)}
       
       else{this.svg.style('background-image', `url('${this.url.nativeElement.value}')`)}
    }

    onModelChanged(model: PanZoomModel): void {
        if (this.artboard && model.zoomLevel >= 1) {
            this.svg.selectAll('circle').attr('r', 4 / (model.zoomLevel/1.5));
            this.svg.selectAll('polyline').attr('stroke-width', 1 / (model.zoomLevel/2));
            this.svg.selectAll('circle').attr('stroke-width', 1 / (model.zoomLevel/2));

        }
    }

    public addToHistory(drawing, startPoint, g, points): void {
        let collection = this.artboard.nativeElement.children[0].innerHTML
        cloneDeep(g)
        this.history.unshift([JSON.stringify(collection), JSON.stringify(drawing), JSON.stringify(startPoint), cloneDeep(g), JSON.stringify(points)])
        if (this.history.length > 15) {
            this.history.pop()
        }
    }

    public addToLocalStorage(): void {
        let collection = this.artboard.nativeElement.children[0].innerHTML

        localStorage.setItem('artboard', JSON.stringify(collection));
        localStorage.setItem('url', this.url.nativeElement.value);
        localStorage.setItem('opacity', this.opacity.nativeElement.value)

    }

    public undo(): void {
        if (this.history.length > 0) {
            var parser = new DOMParser();
            this.artboard.nativeElement.children[0].innerHTML = JSON.parse(this.history[0][0]);
            this.drawing = JSON.parse(this.history[0][1])
            this.startPoint = JSON.parse(this.history[0][2])
            this.g = this.history[0][3]
            this.points = JSON.parse(this.history[0][4])
            this.history.shift();
        }
    }

    public toFront(i: number) {
        this.artboard.nativeElement.children[0].append(this.artboard.nativeElement.children[0].children[i])
    }

    public toBottom(i: number) {
        this.artboard.nativeElement.children[0].prepend(this.artboard.nativeElement.children[0].children[i])
    }

    public toggleVisibility(i: number) {
        console.log(this.svg.selectAll('g'))
        if (this.artboard.nativeElement.children[0].children[i].getAttribute('opacity') != '0') {
            this.artboard.nativeElement.children[0].children[i].setAttribute('opacity', '0')
            this.artboard.nativeElement.children[0].children[i].setAttribute('layerHidden', 'true')
            return
        }

        this.artboard.nativeElement.children[0].children[i].setAttribute('opacity', this.opacity.nativeElement.value * .01)
        this.artboard.nativeElement.children[0].children[i].setAttribute('layerHidden', 'false')

    }

    public getVisibility(i: number): boolean {
        if (this.artboard.nativeElement.children[0].children[i].getAttribute('opacity') != '0') {
            return true
        }
        return false
    }

    public deleteLayer(i: number) {
    this.artboard.nativeElement.children[0].children[i].remove()

    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) { 
      if(event.code == "KeyR" ) this.changeColor(0)
      if(event.code == "KeyL" ) this.changeColor(1)
      if(event.code == "KeyU" ) this.changeColor(2)
      if(event.code == "KeyM" ) this.changeColor(3)
      if(event.code == "KeyC" ) this.changeColor(4)
      if(event.code == "KeyZ" && event.ctrlKey == true ) this.undo()
    }

    public getLayerType(i: number): String {
        
        let colors = [['#402020 completePoly', 'Road'], ['#ff0000 completePoly', 'Lane Markings'], ['#808060 completePoly', 'Undrivable'], ['#00ff66 completePoly', 'Movable'], ['#cc00ff completePoly', 'My Car']]
        for(var j = 0; j < colors.length; j++){
            if( colors[j][0] == this.artboard.nativeElement.children[0].children[i].getAttribute('class')){
                return colors[j][1]
            }
        }
        return 'In Progress'
        }

        public reset(): void{
            if(confirm("This will reset your entire document. Continue?")){
            localStorage.clear();
            location.reload();
            }
         }

    }
