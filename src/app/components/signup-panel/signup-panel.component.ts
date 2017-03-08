import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {UserService} from "../../services/UserService";

import {UsernameValidator} from "../../validators/UsernameValidator";
import {EmailValidator} from "../../validators/EmailValidator";
import {PasswordValidator} from "../../validators/PasswordValidator";
import {RepeatPasswordValidator} from "../../validators/RepeatPasswordValidator";

@Component({
  selector: 'signup-panel',
  templateUrl: './signup-panel.component.html',
  styleUrls: ['./signup-panel.component.css']
})
export class SignupPanelComponent implements OnInit {

  private form : FormGroup;

  private userInput: AbstractControl;
  private username: string = '';

  private emailInput: AbstractControl;
  private email: string = '';

  private passwordInput: AbstractControl;
  private password: string = '';

  private repeatPasswordInput: AbstractControl;
  private repeatPassword: string = '';

  constructor(public formBuilder: FormBuilder, public userService: UserService) {

    this.form = this.formBuilder.group({
      user: new FormControl('', Validators.compose([Validators.required, UsernameValidator])),
      email: new FormControl('', Validators.compose([Validators.required, EmailValidator])),
      password: new FormControl('', Validators.compose([Validators.required, PasswordValidator])),
      repeatPassword: new FormControl('', Validators.required)
    },{validator: RepeatPasswordValidator});

    this.userInput = this.form.controls['user'];
    this.emailInput = this.form.controls['email'];
    this.passwordInput = this.form.controls['password'];
    this.repeatPasswordInput = this.form.controls['repeatPassword'];
  }

  ngOnInit() {
  }

  public onSubmitRegister() {
    //TODO: Manage register
    console.log("Submit del registro enviado");
  }
}

