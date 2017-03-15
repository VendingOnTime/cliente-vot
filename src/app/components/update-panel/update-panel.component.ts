import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {UserService} from "../../services/UserService";

import {EmailValidator} from "../../validators/EmailValidator";
import {PasswordValidator} from "../../validators/PasswordValidator";
import {RepeatPasswordValidator} from "../../validators/RepeatPasswordValidator";
@Component({
  selector: 'update-panel',
  templateUrl: './update-panel.component.html',
  styleUrls: ['./update-panel.component.css']
})
export class UpdatePanelComponent implements OnInit {

  private form : FormGroup;

  private emailInput: AbstractControl;
  private email: string = '';

  private oldPasswordInput: AbstractControl;
  private oldPassword: string = '';

  private passwordInput: AbstractControl;
  private password: string = '';

  private repeatPasswordInput: AbstractControl;
  private repeatPassword: string = '';

  constructor(public formBuilder: FormBuilder, public userService: UserService) {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, EmailValidator])),
      oldPassword: new FormControl('', Validators.compose([Validators.required, PasswordValidator])),
      password: new FormControl('', Validators.compose([Validators.required, PasswordValidator])),
      repeatPassword: new FormControl('', Validators.required)
    },{validator: RepeatPasswordValidator});

    this.emailInput = this.form.controls['email'];
    this.oldPasswordInput = this.form.controls['oldPassword'];
    this.passwordInput = this.form.controls['password'];
    this.repeatPasswordInput = this.form.controls['repeatPassword'];

  }

  ngOnInit() {
  }

  onSubmitUpdate(){
    console.log("Enviado formlario de update panel")
  }

}
