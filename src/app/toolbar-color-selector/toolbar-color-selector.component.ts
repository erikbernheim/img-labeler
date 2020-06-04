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
  public colors;
  public ntype = environment.colors[0];
  public compactDropDownMenu = false;

  ngOnInit(): void {
    this.selectMenuLayout(window.innerWidth);
  }

  public selectMenuLayout(windowWidth) {
    if (windowWidth < 1200) {
      this.compactDropDownMenu = true;
        this.colors = environment.colors.filter(elem => elem.name != this.ntype.name);
    } else {
      this.compactDropDownMenu = false;
      this.colors = environment.colors;
    }
  }

  public setColor(index: number){
    this.maskSvc.setColor(index);
    this.ntype = this.colors[index];
    if (this.compactDropDownMenu) {
      this.colors = environment.colors.filter(elem => elem.name != this.ntype.name);
    } else {
      this.colors = environment.colors;
    }
  }


  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      if (event.code === 'KeyR') { this.setColor(0); }
      if (event.code === 'KeyL') { this.setColor(1); }
      if (event.code === 'KeyU') { this.setColor(2); }
      if (event.code === 'KeyM') { this.setColor(3); }
      if (event.code === 'KeyC') { this.setColor(4); }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.selectMenuLayout(window.innerWidth);
  }
}
