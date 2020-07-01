import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { Observable, Subject } from 'rxjs';
import { Layer } from '../models/layer';
import { LayerChange } from '../models/layer-change';

@Injectable({
  providedIn: 'root'
})
export class MaskingService {
  public currentColor: Color = environment.colors[0];
  public maskUrl: Subject<string> = new Subject<string>();
  public imageUrl: Subject<string> = new Subject<string>();
  public layers: Subject<Layer[]> = new Subject<Layer[]>();
  public layerChange: Subject<LayerChange> = new Subject<LayerChange>();
  public mask: any;
  public currentOpacity: number;
  public currentUrl: string = environment.defaultImage;
  public currentMaskUrl: string;
  public artboard: any;

  constructor() {
  }
  public setColor(index: number): void {
    this.currentColor = environment.colors[index];
  }

  public setArtboard(artboard: any): void {
    this.artboard = artboard;
  }

  public togglePixelation(): void {
    if (getComputedStyle(this.mask.dom.children[0]).imageRendering === 'pixelated') {
      this.mask.dom.children[0].style.imageRendering = 'auto';
    } else {
      this.mask.dom.children[0].style.imageRendering = 'pixelated';
    }
  }

  public getPixelation(): boolean {
    if (getComputedStyle(this.mask.dom.children[0]).imageRendering === 'pixelated') {
      return true;
    }
      return false;
  }

  public getColor(): Color {
    return this.currentColor;
  }

  public setImageUrl(url: string): void {
    if (this.mask && this.mask.dom.children[0].children.length > 0) {
      this.modifyLayer(new LayerChange({ index: 0, type: 'clearAll' }));
      this.currentUrl = url;
      this.imageUrl.next(url);
    } else {
      this.currentUrl = url;
      this.imageUrl.next(url);
    }
  }

  public getImageUrl(): Observable<string> {
    return this.imageUrl;
  }

  public getCurrentImageUrl(): string {
    return this.currentUrl;
  }

  public setMaskUrl(url: string): void {
    this.currentMaskUrl = url;
    this.maskUrl.next(url);
    this.updateMask(this.mask);
  }

  public getMaskUrl(): Observable<string> {
    return this.maskUrl;
  }

  public updateMask(mask): void {
    this.mask = mask;
    let layers: Layer[] = [];
    let i = 0;
    if (mask.dom.children[0].children.length > 0) {
      mask.dom.children[0].children.forEach(element => {
        if (element.classList[1] === 'completePoly') {
          const color = element.getAttribute('color');
          layers.push(new Layer({ type: color, index: i.toString(), visibility: element.attributes.visibility.value }))
        }
        i++;
      });
      this.layers.next(layers);
    }
  }

  public loadedMask(): boolean {
    if (this.mask.dom.children[0].children.length > 0) {
      for (let element of this.mask.dom.children[0].children) {
        if (element.classList[0] === 'existingMask') {
          return true;
        }
      }
    }
    return false;
  }

  public loadedMaskUrl(): string {
    if (this.mask.dom.children[0].children.length > 0) {
      for (let element of this.mask.dom.children[0].children) {
        if (element.classList[0] === 'existingMask') {
          return element.children[0].href.baseVal
        }
      }
    }
  }

  public setLayers(layers: Layer[]): void {
    this.layers.next(layers);
  }

  public getLayers(): Observable<Layer[]> {
    return this.layers;
  }

  public modifyLayer(change: LayerChange): void {
    if (change.type === 'opacity') {
      this.currentOpacity = change.index * .01;
    }
    this.layerChange.next(change);
  }

  public revert(collection: string): void {
    let req = new LayerChange({ type: 'revert', index: 0 }, collection)
    this.layerChange.next(req);
  }

  public getLayerChange(): Observable<LayerChange> {
    return this.layerChange;
  }
}
