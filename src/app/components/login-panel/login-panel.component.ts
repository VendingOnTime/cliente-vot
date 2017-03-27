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
  private user: string = '';
  private errorUser: string = 'Ha de introducirse un nombre de usuario o email';

  private passwordInput: AbstractControl;
  private password: string = '';

  private loginError: boolean = false;
  private loginErrorMessage: string = 'La combinación de usuario y contraseña introducida es incorrecta';

  private initSessionMessage: string = 'Iniciar sesión';
  private registerMessage: string = '¿Aun no eres cliente?';
  private registerLink: string = 'Registrarse';

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
    //TODO: Redirigir a otra página o hacer que otro componente redirija a otra página
  }

}
