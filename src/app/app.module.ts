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
import {StorageService} from "./services/StorageService";
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AddMachineComponent } from './components/add-machine/add-machine.component';
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import { HomeSectionComponent } from './components/home-section/home-section.component';
import {AuthGuard} from "./guards/AuthGuard.service";
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { IssuesPanelComponent } from './components/issues-panel/issues-panel.component';
import { TechniciansPanelComponent } from './components/technicians-panel/technicians-panel.component';
import { UpdateMachineComponent } from './components/update-machine/update-machine.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import {MachineService} from "./services/MachineService";
import {AutocompleteService} from "./services/AutocompleteService";
import { ListMachineComponent } from './components/list-machine/list-machine.component';
import {LocalesService} from "./services/LocalesService";
import {LanguageReducer} from "./redux/reducers/Language.reducer";
import {ServerConfigReducer} from "./redux/reducers/ServerConfig.reducer";
import {UserReducer} from "./redux/reducers/User.reducer";
import {StoreModule} from "@ngrx/store";
import {ModalModule} from "angular2-modal";
import {ServerDirectionService} from "./services/server-direction/server-direction.service";
import { AddTechnicianComponent } from './components/add-technician/add-technician.component';


const routes : Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeSectionComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPanelComponent},
  {path: 'signup', component: SignupPanelComponent},
  {path: 'update', component: UpdateUserComponent},
  {path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard]},
  {path: 'issues', component: IssuesPanelComponent, canActivate: [AuthGuard]},
  {path: 'technicians', component: TechniciansPanelComponent, canActivate: [AuthGuard]},
  {path: 'machines', component: ListMachineComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupPanelComponent,
    LoginPanelComponent,
    UpdateUserComponent,
    NavigationBarComponent,
    UpdateUserComponent,
    AddMachineComponent,
    HomeSectionComponent,
    AdminPanelComponent,
    IssuesPanelComponent,
    TechniciansPanelComponent,
    UpdateMachineComponent,
    AddMachineComponent,
    AutocompleteComponent,
    ListMachineComponent,
    AddTechnicianComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore({userReducer: UserReducer, serverConfigReducer: ServerConfigReducer, languageReducer: LanguageReducer}),
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    FormBuilder,
    UserService,
    StorageService,
    AuthGuard,
    MachineService,
    AutocompleteService,
    LocalesService,
    ServerDirectionService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddMachineComponent, UpdateMachineComponent]
})
export class AppModule { }
