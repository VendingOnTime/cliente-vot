import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-panel',
  templateUrl: 'login-panel.component.html',
  styleUrls: ['login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  prueba = ["prjnewf", "wkj2nd2", "kn2jen2jh"];

  constructor() { }

  ngOnInit() {
  }

  metodo() {
    console.log("Prueba");
  }
}
