import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LocalesService} from "../../services/LocalesService";
import {UsernameValidator} from "../../validators/username/UsernameValidator";
import {EmailValidator} from "../../validators/EmailValidator";
import {DniValidator} from "../../validators/dni/DniValidator";
import {PasswordValidator} from "../../validators/password/PasswordValidator";
import {RepeatPasswordValidator} from "../../validators/repeat-password/RepeatPasswordValidator";


@Component({
  selector: 'add-technician',
  templateUrl: './add-technician.component.html',
  styleUrls: ['./add-technician.component.css']
})
export class AddTechnicianComponent {


  // Form components
  private form : FormGroup;
  private usernameInput: AbstractControl;
  private passwordInput: AbstractControl;
  private repeatPasswordInput: AbstractControl;
  private emailInput: AbstractControl;
  private dniInput: AbstractControl;
  private nameInput: AbstractControl;
  private surnameInput: AbstractControl;
  // Data binding

  private username: string = '';
  private password: string = '';
  private repeatPassword: string = '';
  private email: string = '';
  private dni: string = '';
  private name: string = '';
  private surname: string = '';

  // Locals
  public techLocales;
  public formLocales;

  public constructor(
    public formBuilder: FormBuilder,
    public localesService: LocalesService
  ) {

    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required, UsernameValidator])),
      email: new FormControl('', Validators.compose([Validators.required, EmailValidator])),
      password: new FormControl('', Validators.compose([Validators.required, PasswordValidator])),
      repeatPassword: new FormControl('', Validators.compose([Validators.required])),
      dni: new FormControl('', Validators.compose([Validators.required, DniValidator])),
      // FIXME hacer diferentes validadores para name y surname?
      name: new FormControl('', Validators.compose([Validators.required, UsernameValidator])),
      surname: new FormControl('', Validators.compose([Validators.required, UsernameValidator]))
    }, {validator: RepeatPasswordValidator});

    this.usernameInput = this.form.controls['username'];
    this.passwordInput = this.form.controls['password'];
    this.repeatPasswordInput = this.form.controls['repeatPassword'];
    this.emailInput = this.form.controls['email'];
    this.dniInput = this.form.controls['dni'];
    this.nameInput = this.form.controls['name'];
    this.surnameInput = this.form.controls['surname'];

    this.techLocales = localesService.get_TechniciansPanelComponent_Locales();
    this.formLocales = localesService.get_Forms_Locales();
  }

  public onSubmitCreate(): void{
    console.log("Crealo")
  }
}
