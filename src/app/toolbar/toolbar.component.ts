import { Component, OnInit } from '@angular/core';
import { SvgtopngService } from '../services/svgtopng.service';
import { version } from 'package.json';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public version: string = version;
  constructor(private svgToPng: SvgtopngService) { }

  ngOnInit(): void {
  }

  public save(){
    this.svgToPng.save();
  }

}
