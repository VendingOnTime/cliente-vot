import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesPanelComponent } from './machines-panel.component';

describe('MachinesPanelComponent', () => {
  let component: MachinesPanelComponent;
  let fixture: ComponentFixture<MachinesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
