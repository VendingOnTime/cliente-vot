import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {StorageService} from "../../services/StorageService";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserReducerState} from "../../redux/reducers/User.reducer";
import {LocalesService} from "../../services/LocalesService";


@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  public isCollapsed: boolean = false;
  public userReducerState: Observable<UserReducerState> = this.storage.getUserReducer();


  public constructor(
    public storage: StorageService,
    private router: Router,
    public localesService: LocalesService
  ) {
    this.storage.getStore().subscribe( state => console.log('Initial App State: ', state));
  }


  /** Router methods */

  public goToRegister() {
    this.router.navigate(['signup']);
  }

  public goToLogin() {
    this.router.navigate(['login']);
  }

  //TODO: Finish dropdown button
  public goToProfile() {

  }

  public goToAdminSection() {
    this.router.navigate(['admin']);
  }

  public goToIssuesPanel() {
    this.router.navigate(['issues']);
  }

  public goToTechniciansPanel() {
    this.router.navigate(['technicians']);
  }

  public goToMachinesPanel() {
    this.router.navigate(['machines']);
  }

  public getUser() : Observable<User> {
    return this.userReducerState.map((data: UserReducerState) => data.user);
  }

  public getLoggedUsername() : Observable<string> {
    return this.getUser().map((user : User) => user.username);
  }

  public getLogged() : boolean {
    let logged: boolean;
    this.userReducerState.subscribe((data: UserReducerState) => logged = data.logged);
    return logged;
  }
}
