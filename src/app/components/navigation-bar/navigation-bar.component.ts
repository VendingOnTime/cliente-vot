import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  //FIXME: Bind with the login state (redux)
  private loggedUser: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
