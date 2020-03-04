import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas-map',
  templateUrl: './canvas-map.component.html',
  styleUrls: ['./canvas-map.component.css']
})
export class CanvasMapComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  public drawing: boolean = false;
  public points:number[][] = [];
  constructor() { }

  ngOnInit(): void {
  }

  click(e): void{
    console.log(e);
    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx.fillRect(e.offsetX,e.offsetY,10,10);
    this.points.push([e.offsetX, e.offsetY]);
    let pointsL = this.points.length;
    if(this.points.length > 1){
      ctx.moveTo(this.points[pointsL - 1][0],this.points[pointsL - 1][1])
      ctx.lineTo(this.points[pointsL - 2][0],this.points[pointsL - 2][1]);
      ctx.stroke();
    }
  }

}
