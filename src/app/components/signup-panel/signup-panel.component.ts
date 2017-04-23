import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {UserService} from "../../services/UserService";
import {UsernameValidator} from "../../validators/username/UsernameValidator";
import {EmailValidator} from "../../validators/EmailValidator";
import {PasswordValidator} from "../../validators/password/PasswordValidator";
import {RepeatPasswordValidator} from "../../validators/repeat-password/RepeatPasswordValidator";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {Overlay} from "angular2-modal";
import {Router} from "@angular/router";
import {StorageService} from "../../services/StorageService";
import {User} from "../../models/User";
import {Response} from "@angular/http";
import {LocalesService} from "../../services/LocalesService";


@Component({
  selector: 'signup-panel',
  templateUrl: './signup-panel.component.html',
  styleUrls: ['./signup-panel.component.css']
})
export class SignupPanelComponent {

  // Component references
  private form : FormGroup;
  private userInput: AbstractControl;
  private emailInput: AbstractControl;
  private passwordInput: AbstractControl;
  private repeatPasswordInput: AbstractControl;

  // Data binding
  private username: string = '';
  private email: string = '';
  private password: string = '';
  private repeatPassword: string = '';


  public constructor(
    private overlay: Overlay,
    private vcRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private storeService: StorageService,
    private modal: Modal,
    private router: Router,
    public localesService : LocalesService
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


  /** Actions */

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
          this.modal.alert().showClose(true).title(this.localesService.get_SignUpComponent_Locales().modal_errorTitle).body(this.localesService.get_SignUpComponent_Locales().modal_errorBody).open();

      },
      (err) => {
        this.modal.alert().showClose(true).title(this.localesService.get_SignUpComponent_Locales().modal_errorTitle).body(this.localesService.get_SignUpComponent_Locales().modal_errorBody).open();
      }
    );
  }
}
