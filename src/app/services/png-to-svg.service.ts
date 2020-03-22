import { Injectable } from '@angular/core';
import * as parseSVG from 'svg-path-parser';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PngToSvgService {

  constructor() { }

  // this is from https://github.com/Phrogz/svg-path-to-polygons/blob/master/svg-path-to-polygons.js
  // imported into service to fix broken packaging

  public svgPathToPolygons(svgPathString: string, opts: any = {}) {
    if (!opts.tolerance) { opts.tolerance = 1; }
    const polys = [];
    const tolerance2 = opts.tolerance * opts.tolerance;
    let poly: any = [];
    let prev;
    parseSVG.makeAbsolute(parseSVG(svgPathString)).forEach(cmd => {
      switch (cmd.code) {
        case 'M':
          polys.push(poly = []);
        // intentional flow-through
        case 'L':
        case 'H':
        case 'V':
        case 'Z':
          add(cmd.x, cmd.y);
          if (cmd.code === 'Z') { poly.closed = true; }
          break;

        case 'C':
          sampleCubicBézier(cmd.x0, cmd.y0, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
          add(cmd.x, cmd.y);
          break;

        case 'S':
          let x1 = 0;
          let y1 = 0;
          if (prev) {
            if (prev.code === 'C') {
              x1 = prev.x * 2 - prev.x2;
              y1 = prev.y * 2 - prev.y2;
            } else {
              x1 = prev.x;
              y1 = prev.y;
            }
          }
          sampleCubicBézier(cmd.x0, cmd.y0, x1, y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
          add(cmd.x, cmd.y);
          break;

        default:
          console.error('Our deepest apologies, but ' + cmd.command + ' commands (' + cmd.code + ') are not yet supported.');
          process.exit(2);
      }
      prev = cmd;
    });
    return polys;

    // http://antigrain.com/research/adaptive_bezier/
    function sampleCubicBézier(x0, y0, x1, y1, x2, y2, x3, y3) {
      // Calculate all the mid-points of the line segments
      const x01 = (x0 + x1) / 2;
      const y01 = (y0 + y1) / 2;
      const x12 = (x1 + x2) / 2;
      const y12 = (y1 + y2) / 2;
      const x23 = (x2 + x3) / 2;
      const y23 = (y2 + y3) / 2;
      const x012 = (x01 + x12) / 2;
      const y012 = (y01 + y12) / 2;
      const x123 = (x12 + x23) / 2;
      const y123 = (y12 + y23) / 2;
      const x0123 = (x012 + x123) / 2;
      const y0123 = (y012 + y123) / 2;

      // Try to approximate the full cubic curve by a single straight line
      const dx = x3 - x0;
      const dy = y3 - y0;

      const d1 = Math.abs(((x1 - x3) * dy - (y1 - y3) * dx));
      const d2 = Math.abs(((x2 - x3) * dy - (y2 - y3) * dx));

      if (((d1 + d2) * (d1 + d2)) < (tolerance2 * (dx * dx + dy * dy))) { add(x0123, y0123); } else { // Continue subdivision
        sampleCubicBézier(x0, y0, x01, y01, x012, y012, x0123, y0123);
        sampleCubicBézier(x0123, y0123, x123, y123, x23, y23, x3, y3);
      }
    }

    function add(x, y) {
      if (opts.decimals && opts.decimals >= 0) {
        x = x.toFixed(opts.decimals) * 1;
        y = y.toFixed(opts.decimals) * 1;
      }
      poly.push([x, y]);
    }
  }


  // this is from https://github.com/substack/point-in-polygon/blob/master/index.js
  // imported into service to fix broken packaging
  public pointInPoly(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    const x = point[0];
    const y = point[1];

    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0];
      const yi = vs[i][1];
      const xj = vs[j][0];
      const yj = vs[j][1];

      const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) { inside = !inside; }
    }

    return inside;
  }
}
