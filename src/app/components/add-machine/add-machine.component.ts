import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {MachineState} from "../../models/MachineState";
import {EnumEx} from "../../utils/EnumEx";
import {MachineType} from "../../models/MachineType";
import {DescriptionValidator} from "../../validators/description/DescriptionValidator";
import {PositionAddressValidator} from "../../validators/PositionAddressValidator";
import {MachineService} from "../../services/MachineService";
import {LocalesService} from "../../services/LocalesService";
import {AutocompleteService} from "../../services/AutocompleteService";
import {StorageService} from "../../services/StorageService";
import {Technician} from "../../models/Technician";
import {Machine} from "../../models/Machine";
import {Location} from "../../models/Location";
import {DialogRef} from "angular2-modal";
import {Response} from "@angular/http";


@Component({
  selector: 'add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent {

  // Form components
  public form : FormGroup;
  public positionAddressInput: AbstractControl;
  public machineTypeInput: AbstractControl;
  public machineStateInput: AbstractControl;
  public descriptionInput: AbstractControl;

  // Data binding
  public positionAddress: string;
  public machineType: string = MachineType[0];
  public machineState: string = MachineState[0];
  public descriptionText: string;
  public technician: string = "";

  // Errors management
  public technicianError: boolean = false;
  public technicianErrorHidden: boolean = true;

  // Component data management
  public autoCompleteList = this.autocompleteService.getAvailableTechnicians(this.storageService.getLoggedUser());
  public enumEx = EnumEx;

  // Locales
  public addMachineLocales;
  public formLocales;

  public constructor(
    public formBuilder: FormBuilder,
    public machineService: MachineService,
    public localesService: LocalesService,
    public autocompleteService : AutocompleteService,
    public storageService : StorageService,
    public dialog: DialogRef<any>
  ) {

    this.form = this.formBuilder.group({
      positionAddress: new FormControl('', Validators.compose([Validators.required, PositionAddressValidator])),
      machineType: new FormControl('', Validators.compose([Validators.required])),
      machineState: new FormControl('', Validators.compose([Validators.required])),
      descriptionText: new FormControl('', Validators.compose([Validators.required, DescriptionValidator]))
    });

    this.positionAddressInput = this.form.controls['positionAddress'];
    this.machineTypeInput = this.form.controls['machineType'];
    this.machineStateInput = this.form.controls['machineState'];
    this.descriptionInput = this.form.controls['descriptionText'];

    this.addMachineLocales = this.localesService.get_AddMachineComponent_Locales();
    this.formLocales = this.localesService.get_Forms_Locales();
  }

  /** Form submit */

  public onSubmitCreate() : void {

    if (!this.technicianError) {

      let introducedMachine : Machine =
        new Machine(
          new Location(this.positionAddress),
          MachineType[this.machineType],
          MachineState[this.machineState],
          new Technician(this.technician),
          this.descriptionText
        );

      this.machineService.createMachine(introducedMachine).subscribe(
        (response: Response) => {

          if (response.ok)
            this.machineCreatedOK();
          else
            this.manageExternalError(response.statusText);
        },
        (err) => {
          this.manageExternalError(err);
        },
        () => {
          this.dialog.close();
        }
      );

    }
  }


  /** Autocomplete management */

  public onNotify(event: string) {
    this.technician = event;

    // Maneja la validacion del error
    // TODO Ver si se puede hacer algo para manejar esto como los demas
    if (this.technician == "") {
      this.technicianError = true;
      this.technicianErrorHidden = false;
    } else {
      this.technicianError = false;
      this.technicianErrorHidden = true;
    }
  }


  /** Form building */

  public getAllMachineTypes() : string[] {
    return this.enumEx.getNames(MachineType);
  }
  public getAllMachineStates() : string[] {
    return this.enumEx.getNames(MachineState);
  }


  /** Utility */

  private cleanForm() {
    //TODO: Restart form
  }

  private manageExternalError(err) {
    //TODO: Crear método para notificar al usuario que la inserción ha fallado
  }

  private machineCreatedOK() {
    //TODO: Crear método para notificar al usuario que la máquina se ha añadido (recargar vista de máquinas)
  }
}
