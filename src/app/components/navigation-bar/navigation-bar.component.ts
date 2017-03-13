import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {Store} from "ngrx/@ngrx/store";
import {ApplicationState} from "../../redux/store/AppStore";

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  //FIXME: Bind with the login state (redux)
  private loggedUser: User;
  private isCollapsed: boolean = false;

  constructor(private store: Store<ApplicationState>) {
    //TODO: PROVISIONAL
    let actualState;
    this.store.subscribe((state: ApplicationState) => actualState = state);
    this.loggedUser = actualState.reducer.user;
  }

  private userIsLogged() : boolean {
    return this.loggedUser != null;
  }

  ngOnInit() {
  }

}
