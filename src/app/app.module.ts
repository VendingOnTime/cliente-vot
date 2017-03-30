import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {UserService} from "./services/UserService";
import { SignupPanelComponent } from './components/signup-panel/signup-panel.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {CollapseDirective} from "ng2-bootstrap";
import {Routes, RouterModule} from "@angular/router";
import {ApplicationReducer} from "./redux/reducers/ApplicationReducer";
import {StoreModule} from "@ngrx/store";
import {StorageService} from "./services/StorageService";
import { UpdatePanelComponent } from './components/update-panel/update-panel.component';
import { AddMachineComponent } from './components/add-machine/add-machine.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupPanelComponent,
    LoginPanelComponent,
    UpdatePanelComponent,
    NavigationBarComponent,
    CollapseDirective,
    UpdatePanelComponent,
    AddMachineComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    //RouterModule.forRoot(routes)
    StoreModule.provideStore(ApplicationReducer)
  ],
  providers: [FormBuilder, UserService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
