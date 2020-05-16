import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarColorSelectorComponent } from './toolbar-color-selector.component';

describe('ToolbarColorSelectorComponent', () => {
  let component: ToolbarColorSelectorComponent;
  let fixture: ComponentFixture<ToolbarColorSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarColorSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarColorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
