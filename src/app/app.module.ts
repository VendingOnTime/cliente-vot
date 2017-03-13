import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';

import { AppComponent } from './app.component';
import {UserService} from "./services/UserService";
import { SignupPanelComponent } from './components/signup-panel/signup-panel.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {CollapseDirective} from "ng2-bootstrap";
import {Routes, RouterModule} from "@angular/router";
import {ApplicationReducer} from "./redux/reducers/ApplicationReducer";
import {StoreModule} from "ngrx/@ngrx/store";


@NgModule({
  declarations: [
    AppComponent,
    SignupPanelComponent,
    LoginPanelComponent,
    NavigationBarComponent,
    CollapseDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ProgressbarModule.forRoot(),
    //RouterModule.forRoot(routes)
    StoreModule.provideStore({reducer: ApplicationReducer})
  ],
  providers: [FormBuilder, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
