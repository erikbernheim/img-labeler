import { Component, OnInit } from '@angular/core';
import { SvgtopngService } from '../services/svgtopng.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private svgToPng: SvgtopngService) { }

  ngOnInit(): void {
  }

  public save(){
    this.svgToPng.save();
  }

}
