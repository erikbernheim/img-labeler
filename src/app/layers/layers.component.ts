import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MaskingService } from '../services/masking.service';
import { Layer } from '../models/layer';
import { environment } from 'src/environments/environment';
import { LayerChange } from '../models/layer-change';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.css']
})
export class LayersComponent implements OnInit {
  public layers: Layer[];
  constructor(private maskSvc: MaskingService) { }
  @ViewChild('opacity') opacityForm;
  ngOnInit(): void {
    this.maskSvc.getLayers().subscribe(layers => {
      this.layers = layers.reverse();
    })
  }

  public toTop(i: number): void {
    this.maskSvc.modifyLayer(new LayerChange({index: i, type: 'up'}))
  }

  public toBottom(i: number): void {
    this.maskSvc.modifyLayer(new LayerChange({index: i, type: 'down'}))
  }

  public delete(i: number): void {
    if(this.layers.length === 1){
      this.layers = undefined;
    }
    this.maskSvc.modifyLayer(new LayerChange({index: i, type: 'delete'}));
  }

  public toggle(i: number): void {
    this.maskSvc.modifyLayer(new LayerChange({index: i, type: 'toggle'}));
  }

  public toggleAll(): void {
    this.maskSvc.modifyLayer(new LayerChange({index: 0, type: 'toggleAll'}));
  }

  public updateOpacity(): void {
    this.maskSvc.modifyLayer(new LayerChange({index: parseInt(this.opacityForm.nativeElement.value), type: 'opacity'}));
  }

  public deleteAll(): void {
    this.maskSvc.modifyLayer(new LayerChange({index: 0, type: 'clearAll'}));
  }  

  public getLayerType(layerColor: string): string{
    if( layerColor === 'existingMask') {return 'Existing Mask'}
   return environment.colors.filter(color => color.color == layerColor)[0].name;
  }

  public incrementOpacity(up: boolean): void {
    let opacity = parseInt(this.opacityForm.nativeElement.value);
    if (up) {
        opacity = Math.min(opacity + 20, 100);
    } else {
        opacity = Math.max(opacity - 20, 0);
    }
    this.opacityForm.nativeElement.value = opacity;
    this.updateOpacity();
}


  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      if (event.code === 'ArrowUp') { this.incrementOpacity(true); }
      if (event.code === 'ArrowDown') { this.incrementOpacity(false); }
      if (event.code === 'Comma') { this.toggleAll(); }

  }
}
