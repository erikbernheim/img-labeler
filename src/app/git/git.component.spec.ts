import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitComponent } from './git.component';

describe('GitComponent', () => {
  let component: GitComponent;
  let fixture: ComponentFixture<GitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
