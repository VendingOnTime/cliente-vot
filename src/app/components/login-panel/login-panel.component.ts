import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {UsernameValidator} from "../../validators/UsernameValidator";
import {UserService} from "../../services/UserService";

@Component({
  selector: 'login-panel',
  templateUrl: 'login-panel.component.html',
  styleUrls: ['login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

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
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required])
    });

    this.userInput = this.form.controls['user'];
    this.emailInput = this.form.controls['email'];
    this.passwordInput = this.form.controls['password'];
    this.repeatPasswordInput = this.form.controls['repeatPassword'];
  }

  ngOnInit() {
  }

  public onSubmitRegister() {
    //TODO: Manage register

  }

}
