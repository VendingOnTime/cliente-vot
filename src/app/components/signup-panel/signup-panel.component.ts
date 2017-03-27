import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {UserService} from "../../services/UserService";
import {UsernameValidator} from "../../validators/UsernameValidator";
import {EmailValidator} from "../../validators/EmailValidator";
import {PasswordValidator} from "../../validators/PasswordValidator";
import {RepeatPasswordValidator} from "../../validators/RepeatPasswordValidator";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {Overlay} from "angular2-modal";


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


  private modal_errorTitle = 'Error en el servidor';
  private modal_errorBody = `Ha ocurrido un error al realizar el registro. 
  Inténtelo de nuevo en un momento.`;

  constructor(overlay: Overlay, vcRef: ViewContainerRef, public formBuilder: FormBuilder, public userService: UserService, public modal: Modal) {

    overlay.defaultViewContainer = vcRef;

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

  public onSubmitRegister() : any {
    let registerResult : boolean = this.userService.registerUser(this.userInput.value, this.passwordInput.value, this.emailInput.value);
    this.manageRegister(registerResult);
  }

  public manageRegister(registerResultOK: boolean) : any {
    if (registerResultOK) {
      //TODO: Manage register
    }
    else {
      this.modal.alert().showClose(true).title(this.modal_errorTitle).body(this.modal_errorBody).open();
    }
  }
}
