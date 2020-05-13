import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MaskingService } from '../services/masking.service';

@Component({
  selector: 'app-toolbar-color-selector',
  templateUrl: './toolbar-color-selector.component.html',
  styleUrls: ['./toolbar-color-selector.component.css']
})
export class ToolbarColorSelectorComponent implements OnInit {

  constructor(public maskSvc: MaskingService) { }
  public colors = environment.colors;
  ngOnInit(): void {
  }
  public setColor(index: number){
    this.maskSvc.setColor(index);
  }

}
