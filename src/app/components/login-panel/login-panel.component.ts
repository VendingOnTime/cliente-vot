import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UsernameValidator} from "../../validators/UsernameValidator";

@Component({
  selector: 'login-panel',
  templateUrl: 'login-panel.component.html',
  styleUrls: ['login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  constructor(public formBuilder: FormBuilder) {
    this.formBuilder.group({
      user: new FormControl('', [Validators.required, UsernameValidator]),
      email: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

}
