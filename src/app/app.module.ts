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
import {StoreModule} from "@ngrx/store";
import {StorageService} from "./services/StorageService";
import { UpdatePanelComponent } from './components/update-panel/update-panel.component';
import { AddMachineComponent } from './components/add-machine/add-machine.component';
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import { HomeSectionComponent } from './components/home-section/home-section.component';
import {AuthGuard} from "./guards/AuthGuard.service";
import {rootReducer} from "./redux/reducers/Application.Reducer";
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';


const routes : Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeSectionComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPanelComponent},
  {path: 'signup', component: SignupPanelComponent},
  {path: 'update', component: UpdatePanelComponent}
];

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
    HomeSectionComponent,
    AddMachineComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore(rootReducer),
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [FormBuilder, UserService, StorageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
