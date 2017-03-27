import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {StorageService} from "../../services/StorageService";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  public isCollapsed: boolean = false;
  public user: User = null;

  constructor(public storage: StorageService, private route: ActivatedRoute, private router: Router) {
    storage.getLoggedUser().subscribe((user) => this.user = user);
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
}
