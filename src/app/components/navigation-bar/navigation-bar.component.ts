import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  //FIXME: Bind with the login state (redux)
  private loggedUser: User;
  private isCollapsed: boolean = false;

  constructor() { }

  private userIsLogged() : boolean {
    return this.loggedUser != null;
  }

  ngOnInit() {
  }

}
