import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {StorageService} from "../../services/StorageService";

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  //FIXME: Bind with the login state (redux)
  private loggedUser: User;
  private isCollapsed: boolean = false;

  constructor(private storage: StorageService) {
    this.loggedUser = this.storage.getLoggedUser();
  }

  private userIsLogged() : boolean {
    return this.loggedUser != null;
  }

  ngOnInit() {
  }

}
