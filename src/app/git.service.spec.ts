import { TestBed } from '@angular/core/testing';

import { GitService } from './git.service';

describe('GitService', () => {
  let service: GitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
