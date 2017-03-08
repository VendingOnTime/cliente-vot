import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {UserService} from "../../services/UserService";

@Component({
  selector: 'login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {


  private form : FormGroup;

  private userInput: AbstractControl;
  private username: string = '';

  private passwordInput: AbstractControl;
  private password: string = '';

  constructor(public formBuilder: FormBuilder, public userService: UserService) {

    this.form = this.formBuilder.group({
      user: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });

    this.userInput = this.form.controls['user'];
    this.passwordInput = this.form.controls['password'];
  }

  ngOnInit() {
  }

  public onSubmitLogin() {
    //TODO: Manage register
    console.log("Submit del login enviado");
  }

}
