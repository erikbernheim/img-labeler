import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitManageComponent } from './git-manage.component';

describe('GitManageComponent', () => {
  let component: GitManageComponent;
  let fixture: ComponentFixture<GitManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
