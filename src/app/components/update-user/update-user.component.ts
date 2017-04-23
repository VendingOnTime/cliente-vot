import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {UserService} from "../../services/UserService";
import {EmailValidator} from "../../validators/EmailValidator";
import {PasswordValidator} from "../../validators/password/PasswordValidator";
import {RepeatPasswordValidator} from "../../validators/repeat-password/RepeatPasswordValidator";
import {Overlay} from "angular2-modal";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {StorageService} from "../../services/StorageService";
import {LocalesService} from "../../services/LocalesService";


@Component({
  selector: 'update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  // Component references
  private form : FormGroup;
  private emailInput: AbstractControl;
  private oldPasswordInput: AbstractControl;
  private passwordInput: AbstractControl;
  private repeatPasswordInput: AbstractControl;

  // Data binding
  private email: string = '';
  private oldPassword: string = '';
  private password: string = '';
  private repeatPassword: string = '';


  public constructor(
    public overlay: Overlay,
    public vcRef: ViewContainerRef,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public modal: Modal,
    public localesService: LocalesService
  ) {

    overlay.defaultViewContainer = vcRef;

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


  /** Actions */

  public onSubmitUpdate() {
    let resultOK = this.userService.updateUser(this.emailInput.value, this.passwordInput.value);
    this.manageUpdate(resultOK);
  }


  /** Utility */

  public manageUpdate(resultOK : boolean) : void {
    if (resultOK) {
      //TODO: Manage update
    }
    else
      this.modal.alert().showClose(true).title(this.localesService.get_UpdateUserComponent_Locales().modal_errorTitle).body(this.localesService.get_UpdateUserComponent_Locales().modal_errorBody).open();

  }
}
