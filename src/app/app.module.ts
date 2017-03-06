import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';

import { AppComponent } from './app.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ProgressbarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
