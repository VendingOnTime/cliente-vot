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
import {User} from "../../models/User";
import {Response} from "@angular/http";


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

  // Locals
  public updateUserLocales;
  public formLocales;

  public constructor(
    public overlay: Overlay,
    public vcRef: ViewContainerRef,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public modal: Modal,
    public localesService: LocalesService,
    public storageService: StorageService
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

    let user = this.storageService.getLoggedUser();

    this.email = user.email;

    this.updateUserLocales = localesService.get_UpdateUserComponent_Locales();
    this.formLocales = localesService.get_Forms_Locales();
  }


  /** Actions */

  public onSubmitUpdate() {

    this.userService.updateUser(this.email, this.password).subscribe(
      (response: Response) => {

        if (response.ok) {
          this.cleanForm();
          this.userUpdatedOK();
        }

        else
          this.manageExternalError();
      },
      (err) => {
        this.manageExternalError();
      },
      () => {}
    );

  }


  /** Utility */

  public cleanForm() : void {
    //TODO: Make form cleaning
  }

  public userUpdatedOK() : void {
    //TODO: Manage update

  }

  public manageExternalError() {
    this.modal.alert().showClose(true).title(this.localesService.get_UpdateUserComponent_Locales().modal_errorTitle).body(this.localesService.get_UpdateUserComponent_Locales().modal_errorBody).open();
  }
}
