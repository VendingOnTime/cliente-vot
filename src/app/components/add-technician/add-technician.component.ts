import {Component, EventEmitter, ViewContainerRef} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LocalesService} from "../../services/LocalesService";
import {UsernameValidator} from "../../validators/username/UsernameValidator";
import {EmailValidator} from "../../validators/EmailValidator";
import {DniValidator} from "../../validators/dni/DniValidator";
import {PasswordValidator} from "../../validators/password/PasswordValidator";
import {RepeatPasswordValidator} from "../../validators/repeat-password/RepeatPasswordValidator";
import {TechnicianService} from "../../services/TechnicianService";
import {Technician} from "../../models/Technician";
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {Overlay, DialogRef} from "angular2-modal";


@Component({
  selector: 'add-technician',
  templateUrl: './add-technician.component.html',
  styleUrls: ['./add-technician.component.css']
})
export class AddTechnicianComponent {


  // Form components
  public form : FormGroup;
  public usernameInput: AbstractControl;
  public passwordInput: AbstractControl;
  public repeatPasswordInput: AbstractControl;
  public emailInput: AbstractControl;
  public dniInput: AbstractControl;
  public nameInput: AbstractControl;
  public surnameInput: AbstractControl;
  // Data binding

  public username: string = '';
  public password: string = '';
  public repeatPassword: string = '';
  public email: string = '';
  public dni: string = '';
  public name: string = '';
  public surname: string = '';

  // Locals
  public techLocales;
  public formLocales;

  //
  public static onCreateTechnician = new EventEmitter(true);

  public constructor(
    public formBuilder: FormBuilder,
    public localesService: LocalesService,
    public technicianService: TechnicianService,
    public dialog: DialogRef<any>,
    public vcRef: ViewContainerRef,
    public modal: Modal,
    public overlay: Overlay
  ) {

    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required, UsernameValidator])),
      email: new FormControl('', Validators.compose([Validators.required, EmailValidator])),
      password: new FormControl('', Validators.compose([Validators.required, PasswordValidator])),
      repeatPassword: new FormControl('', Validators.compose([Validators.required])),
      dni: new FormControl('', Validators.compose([Validators.required, DniValidator])),
      // FIXME hacer diferentes validadores para name y surname?
      name: new FormControl('', Validators.compose([Validators.required, UsernameValidator])),
      surname: new FormControl('', Validators.compose([Validators.required, UsernameValidator])),
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

    this.modal.overlay = overlay;
    this.modal.overlay.defaultViewContainer = vcRef;
  }

  public onSubmitCreate(): void{
    let technician = new Technician(this.name);

    technician.name = this.name;
    technician.surname = this.surname;
    technician.dni = this.dni;
    technician.password = this.password;
    technician.email = this.email;
    technician.user = this.username;

    this.technicianService.createTechnician(technician).subscribe(
      (response) => {
        AddTechnicianComponent.onCreateTechnician.emit(true);
        this.dialog.close();
      },(error) => {
        this.modal.alert().showClose(true).body(this.formLocales.error.undefinedError).open().then(
          (resultPromise) => {
            resultPromise.result.then((result) => {
                this.dialog.close()
              },
              () => {this.dialog.close()}
            );
          }
        );
      })
  }
}
