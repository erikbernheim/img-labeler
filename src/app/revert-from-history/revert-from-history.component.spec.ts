import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevertFromHistoryComponent } from './revert-from-history.component';

describe('RevertFromHistoryComponent', () => {
  let component: RevertFromHistoryComponent;
  let fixture: ComponentFixture<RevertFromHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevertFromHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevertFromHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
