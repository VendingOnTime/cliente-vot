import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {NavigationBarComponent} from "./components/navigation-bar/navigation-bar.component";
import {CollapseDirective} from "ng2-bootstrap";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

/**
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigationBarComponent,
        CollapseDirective
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
**/
