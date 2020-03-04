import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import * as d3 from 'd3';
import * as svg from 'save-svg-as-png';

@Component({
    selector: 'app-drawing-canvas',
    templateUrl: './drawing-canvas.component.html',
    styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent implements OnInit {

    constructor(private renderer: Renderer2) { }
    public dragging = false;
    public drawing = false;
    public startPoint;
    public svg;
    public g;
    public points = []
    public color: string = '#402020';
    public colorIndex: number = 0;
    @ViewChild('artboard') artboard;
    @ViewChild('opacity') opacity;
    @ViewChild('url') url;

    ngOnInit(): void {
        this.svg = d3.select('.artboard').append('svg')
            .attr('height', 950)
            .attr('width', 1250)
    }

    public mouseUp(e) {
        console.log(e)
        if (this.dragging) return;
        this.drawing = true;
        this.startPoint = [e.offsetX, e.offsetY];
        if (this.svg.select('g.drawPoly').empty()) this.g = this.svg.append('g').attr('class', 'drawPoly');
        if (e.toElement.tagName == 'circle') {
            console.log('close!')
            this.closePolygon();
            return;
        };
        this.points.push([e.offsetX, e.offsetY]);
        this.g.select('polyline').remove();
        var polyline = this.g.append('polyline').attr('points', this.points)
            .style('fill', 'none')
            .attr('stroke', '#000');
        for (var i = 0; i < this.points.length; i++) {

            this.g.append('circle')
                .attr('cx', this.points[i][0])
                .attr('cy', this.points[i][1])
                .attr('r', 4)
                .attr('fill', 'yellow')
                .attr('stroke', '#000')
                .attr('is-handle', 'true')
                .attr('style', "cursor:pointer");
        }
    };
    public closePolygon() {
        this.svg.select('g.drawPoly').remove();
        var g = this.svg.append('g');
        g.append('polygon')
            .attr('points', this.points)
            .style('fill', this.color);
        for (var i = 0; i < this.points.length; i++) {
            let holder = this;
            var circle = g.selectAll('circles')
                .data([this.points[i]])
                .enter()
                .append('circle')
                .attr('cx', this.points[i][0])
                .attr('cy', this.points[i][1])
                .attr('r', 4)
                .attr('fill', '#FDBC07')
                .attr('stroke', '#000')
                .attr('is-handle', 'true')
                .attr('cursor', 'move')
                .call(d3.drag()
                    .on('drag', function () {
                        holder.handleDrag(this);
                    })
                    .on("end", () => (this.dragging = false))
                );


        }
        this.points.splice(0);
        this.drawing = false;
    }
    public mouseMove(e) {
        if (!this.drawing || e.target == 'circle') return;

        var g = d3.select('g.drawPoly');
        g.select('line').remove();
        var line = g.append('line')
            .attr('x1', this.startPoint[0])
            .attr('y1', this.startPoint[1])
            .attr('x2', e.pageX - this.artboard.nativeElement.offsetLeft + 1)
            .attr('y2', e.pageY - this.artboard.nativeElement.offsetTop + 1)
            .attr('stroke', '#53DBF3')
            .attr('stroke-width', 1);
    }

    public handleDrag(e) {
        console.log(e)
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
        console.log(this.opacity.nativeElement.value)
        this.svg.selectAll('polygon').style('opacity', this.opacity.nativeElement.value * .01);
        this.svg.selectAll('circle').style('opacity', this.opacity.nativeElement.value * .01);

    }

    public save(): void {
        this.svg.selectAll('polygon').style('opacity', 1);
        this.svg.selectAll('circle').style('opacity', 0);
        svg.saveSvgAsPng(this.artboard.nativeElement.children[0],this.url.nativeElement.value.split('/').pop(), {width:1164, height:874, top:43, left: 38});

    }
    public changeColor(id: number): void{
        let colors = ['#402020', '#ff0000', '#808060', '#00ff66', '#cc00ff']
        this.color = colors[id];
        this.colorIndex = id;
    }

    public updateImage(): void{
        this.svg.style('background-image', `url('${this.url.nativeElement.value}')`)
    }



}
