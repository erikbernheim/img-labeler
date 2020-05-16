import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { MaskingService } from './masking.service';
import * as svgSave from 'save-svg-as-png';
import * as Jimp from 'jimp';


@Injectable({
  providedIn: 'root'
})
export class SvgtopngService {
  public base64Mask: string;
  constructor(private maskSvc: MaskingService) { }


  public save(): void {
    if (window.devicePixelRatio !== 1) {
      let confirmationPrompt = confirm('Error: Canvas incorrect size, if you are zoomed in, please zoom to 100% and save again. Do you still wish to save?');
      if (confirmationPrompt === false) {
        return;
      }
    }
    const holder = this;
    if (!this.maskSvc.loadedMask()) {
      this.maskSvc.mask.d3.selectAll('.completePoly').attr('opacity', 1);
      this.maskSvc.mask.d3.selectAll('.completePoly').attr('visibility', 'visible');
      this.maskSvc.mask.d3.selectAll('circle').attr('opacity', 0);
      this.maskSvc.mask.d3.insert('polygon', ':first-child').attr('class', 'background').style('fill', '#808060')
        .attr('points', '0,0,0,950,1250,950,1250,0').attr('shape-rendering', 'crispEdges');

      svgSave.saveSvgAsPng(this.maskSvc.mask.dom.children[0], this.maskSvc.getCurrentImageUrl().match(/[\w-]+\.(png|jpg)/)[0]
        .replace(/.(png|jpg)/, ''), { width: 1164, height: 874, top: 38, left: 43, encoderOptions: 0.0 }).then(
          () => {
            this.maskSvc.mask.d3.selectAll('.completePoly').attr('opacity', this.maskSvc.currentOpacity);
            this.maskSvc.mask.d3.selectAll('circle').attr('opacity', 1);
            this.maskSvc.mask.d3.selectAll('.background').remove();
          }
        );

    } else {
      this.maskSvc.mask.d3.selectAll('.completePoly').attr('opacity', 1);
      this.maskSvc.mask.d3.selectAll('.completePoly').attr('visibility', 'visible');
      this.maskSvc.mask.d3.selectAll('circle').attr('opacity', 0);
      svgSave.svgAsPngUri(this.maskSvc.mask.dom.children[0], { width: 1164, height: 874, top: 38, left: 43, encoderOptions: 0.0 })
        .then(uri => {
          Jimp.read(this.maskSvc.loadedMaskUrl(), (err, originalMask) => {
            Jimp.read(uri, (err, image) => {
              originalMask.composite(image, 0, 0);
              holder.downloadImage(originalMask);
            });
          });
          this.maskSvc.mask.d3.selectAll('.completePoly').attr('opacity', this.maskSvc.currentOpacity);
          this.maskSvc.mask.d3.selectAll('circle').attr('opacity', 1);
        }
        );
    }
  }

  public downloadImage(image) {
    image.getBase64(Jimp.AUTO, (err, res) => {
      const download = document.createElement('a');
      download.href = res;
      download.download = this.maskSvc.currentUrl.match(/[\w-]+\.(png|jpg)/)[0];
      download.click();
    });
  }


  public base64ToGit(): Promise<string> {
    const holder = this;
    console.log('wack')
    let gitImage;
    if (!this.maskSvc.loadedMask()) {
      this.maskSvc.mask.d3.selectAll('.completePoly').attr('opacity', 1);
      this.maskSvc.mask.d3.selectAll('.completePoly').attr('visibility', 'visible');
      this.maskSvc.mask.d3.selectAll('circle').attr('opacity', 0);
      this.maskSvc.mask.d3.insert('polygon', ':first-child').attr('class', 'background').style('fill', '#808060')
        .attr('points', '0,0,0,950,1250,950,1250,0').attr('shape-rendering', 'crispEdges');
      return svgSave.svgAsPngUri(this.maskSvc.mask.dom.children[0],
        { width: 1164, height: 874, top: 38, left: 43, encoderOptions: 0.0 }).then(
          (image) => {
            gitImage = image;
            this.maskSvc.mask.d3.selectAll('.completePoly').attr('opacity', this.maskSvc.currentOpacity);
            this.maskSvc.mask.d3.selectAll('circle').attr('opacity', 1);
            this.maskSvc.mask.d3.selectAll('.background').remove();
            this.base64Mask = image;
            return image;
          }
        );
    } else {
      console.log('90000')
      this.maskSvc.mask.d3.selectAll('.completePoly').attr('opacity', 1);
      this.maskSvc.mask.d3.selectAll('.completePoly').attr('visibility', 'visible');
      this.maskSvc.mask.d3.selectAll('circle').attr('opacity', 0);
      return svgSave.svgAsPngUri(this.maskSvc.mask.dom.children[0], { width: 1164, height: 874, top: 38, left: 43, encoderOptions: 0.0 })
        .then(uri => {
          Jimp.read(this.maskSvc.loadedMaskUrl(), (err, originalMask) => {
            Jimp.read(uri, (err, image) => {
              originalMask.composite(image, 0, 0);
              return originalMask.getBase64('image/png',(err, res) => {
                this.base64Mask = res;
                return res;
              });
            });
          });
          this.maskSvc.mask.d3.selectAll('.completePoly').attr('opacity', this.maskSvc.currentOpacity);
          this.maskSvc.mask.d3.selectAll('circle').attr('opacity', 1);
        }
        );
    }

  }

  public setBase64(image): string {
    console.log('ongo bongo')
    return image.getBase64(Jimp.AUTO, (err, res) => {
      return res;
    });
  }
}
