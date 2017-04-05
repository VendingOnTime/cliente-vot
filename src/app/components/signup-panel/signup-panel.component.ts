import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {UserService} from "../../services/UserService";
import {UsernameValidator} from "../../validators/UsernameValidator";
import {EmailValidator} from "../../validators/EmailValidator";
import {PasswordValidator} from "../../validators/PasswordValidator";
import {RepeatPasswordValidator} from "../../validators/RepeatPasswordValidator";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {Overlay} from "angular2-modal";
import {Router} from "@angular/router";
import {StorageService} from "../../services/StorageService";
import {User} from "../../models/User";
import {Response} from "@angular/http";


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


  constructor(
    private overlay: Overlay,
    private vcRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private storeService: StorageService,
    private modal: Modal,
    private router: Router
  ) {

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

    this.userService.signUpSupervisor(this.userInput.value, this.passwordInput.value, this.emailInput.value).subscribe(
      (userOK : Response) => {
        let data = userOK.json();
        let OK = data.success;

        if (OK) {
          this.storeService.saveUserFromLogIn(this.userService.buildUser(data.data));
          this.router.navigate(['home']);
        }
        else
          this.modal.alert().showClose(true).title(this.modal_errorTitle).body(this.modal_errorBody).open();

      },
      (err) => {
        this.modal.alert().showClose(true).title(this.modal_errorTitle).body(this.modal_errorBody).open();
      }
    );
  }
}
