import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniciansPanelComponent } from './technicians-panel.component';

describe('TechniciansPanelComponent', () => {
  let component: TechniciansPanelComponent;
  let fixture: ComponentFixture<TechniciansPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniciansPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniciansPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
