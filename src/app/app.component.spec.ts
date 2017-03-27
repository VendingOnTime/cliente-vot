import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {NavigationBarComponent} from "./components/navigation-bar/navigation-bar.component";
import {CollapseDirective} from "ng2-bootstrap";


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigationBarComponent,
        CollapseDirective
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
