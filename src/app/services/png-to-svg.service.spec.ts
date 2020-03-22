import { TestBed } from '@angular/core/testing';

import { PngToSvgService } from './png-to-svg.service';

describe('PngToSvgService', () => {
  let service: PngToSvgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PngToSvgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
