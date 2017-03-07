import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';

import { AppComponent } from './app.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import {UserService} from "./services/UserService";

@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ProgressbarModule.forRoot()
  ],
  providers: [FormBuilder, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
