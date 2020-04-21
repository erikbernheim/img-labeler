import { TestBed } from '@angular/core/testing';

import { LutServiceService } from './lut-service.service';

describe('LutServiceService', () => {
  let service: LutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
