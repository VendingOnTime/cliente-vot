import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {UserService} from "../../services/UserService";
import {EmailValidator} from "../../validators/EmailValidator";
import {PasswordValidator} from "../../validators/PasswordValidator";
import {RepeatPasswordValidator} from "../../validators/RepeatPasswordValidator";
import {Overlay} from "angular2-modal";
import { Modal } from 'angular2-modal/plugins/bootstrap';


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


  private modal_errorTitle = 'Error en el servidor';
  private modal_errorBody = `Ha ocurrido un error al actualizar los datos del usuario. 
  Inténtelo de nuevo en un momento.`;


  constructor(overlay: Overlay, vcRef: ViewContainerRef, public formBuilder: FormBuilder, public userService: UserService, public modal: Modal) {

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

  ngOnInit() {
  }

  public onSubmitUpdate() {
    let resultOK = this.userService.updateUser(this.emailInput.value, this.passwordInput.value);
    this.manageUpdate(resultOK);
  }

  public manageUpdate(resultOK : boolean) : void {
    if (resultOK) {
      //TODO: Manage update
    }
    else {
      this.modal.alert().showClose(true).title(this.modal_errorTitle).body(this.modal_errorBody).open();
    }
  }
}
