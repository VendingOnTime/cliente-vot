import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {StorageService} from "../../services/StorageService";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserReducerState} from "../../redux/reducers/User.reducer";



@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  public isCollapsed: boolean = false;
  public userReducerState: Observable<UserReducerState> = this.storage.getUserReducer();

  constructor(public storage: StorageService, private router: Router) {
  }

  ngOnInit() {
  }

  public goToRegister() {
    this.router.navigate(['signup']);
  }

  public goToLogin() {
    this.router.navigate(['login']);
  }

  public goToProfile() {

  }

  public getUser() : User {
    let user: User;
    this.userReducerState.subscribe((data: UserReducerState) => user = data.user);
    return user;
  }

  public getLogged() : boolean {
    let logged: boolean;
    this.userReducerState.subscribe((data: UserReducerState) => logged = data.logged);
    return logged;
  }
}
