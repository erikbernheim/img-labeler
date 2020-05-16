import { Component, OnInit, HostListener } from '@angular/core';
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


  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      if (event.code === 'KeyR') { this.setColor(0); }
      if (event.code === 'KeyL') { this.setColor(1); }
      if (event.code === 'KeyU') { this.setColor(2); }
      if (event.code === 'KeyM') { this.setColor(3); }
      if (event.code === 'KeyC') { this.setColor(4); }
  }
  
}
