import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {StorageService} from "../../services/StorageService";


@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  private isCollapsed: boolean = false;
  public user: User = null;

  constructor(public storage: StorageService) {
    storage.getLoggedUser().subscribe((user) => this.user = user);
  }

  ngOnInit() {
  }

}
