import { Injectable } from '@angular/core';
import lut from 'src/assets/images.json'
@Injectable({
  providedIn: 'root'
})
export class LutServiceService {
  constructor() { }

  public getUrl(id: string): string {
    return lut.find(obj => obj.id === id).val;
  }


}
