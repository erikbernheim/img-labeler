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
    this.ntype = this.colors[index];
    if (this.compactDropDownMenu) {
      this.maskSvc.setColor(environment.colors.findIndex(e => e.name === this.ntype.name));
      this.colors = environment.colors.filter(elem => elem.name != this.ntype.name);
    } else {
      this.maskSvc.setColor(index);
      this.colors = environment.colors;
    }
  }


  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const KeyMap = ['KeyR', 'KeyL', 'KeyU', 'KeyM', 'KeyC'];
    if (KeyMap.includes(event.code)) {
      const index = KeyMap.findIndex(e => e === event.code);
      if (this.compactDropDownMenu) {
        const name = environment.colors[index].name;
        if (name !== this.ntype.name) {
          this.setColor(this.colors.findIndex(e => e.name === name));
        }
      } else {
        this.setColor(index);
      }
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.selectMenuLayout(window.innerWidth);
  }
}
