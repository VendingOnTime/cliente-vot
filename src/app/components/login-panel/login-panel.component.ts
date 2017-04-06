import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {UserService} from "../../services/UserService";
import {Router} from "@angular/router";
import {LocalesService} from "../../services/LocalesService";


@Component({
  selector: 'login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent {

  // Elements
  private form : FormGroup;
  private userInput: AbstractControl;
  private passwordInput: AbstractControl;

  // Model binding
  private user: string = '';
  private password: string = '';

  // Management
  private loginError: boolean = false;


  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router,
    public localesService: LocalesService
  ) {

    this.form = this.formBuilder.group({
      user: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });

    this.userInput = this.form.controls['user'];
    this.passwordInput = this.form.controls['password'];
  }


  /** Actions */

  public onSubmitLogin() : void {
    if (this.form.valid) {
      let introducedUsername = this.userInput.value;
      let introducedPassword = this.passwordInput.value;
      let correctLogin = this.userService.doLogin(introducedUsername, introducedPassword);

      if (correctLogin)
        this.manageLogin();
      else
        this.loginError = true;
    }
  }

  private manageLogin() {
    this.router.navigate(['/home']);
  }

}
