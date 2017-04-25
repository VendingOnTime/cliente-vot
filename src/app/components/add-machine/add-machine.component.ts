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
import {Position} from "../../models/Position";
import {DialogRef} from "angular2-modal";
import {Response} from "@angular/http";


@Component({
  selector: 'add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent {

  // Form components
  private form : FormGroup;
  private positionAddressInput: AbstractControl;
  private machineTypeInput: AbstractControl;
  private machineStateInput: AbstractControl;
  private descriptionInput: AbstractControl;

  // Data binding
  private positionAddress: string;
  private machineType: string = MachineType[0];
  private machineState: string = MachineState[0];
  private descriptionText: string;
  private technician: string = "";

  // Errors management
  private technicianError: boolean = false;
  private technicianErrorHidden: boolean = true;

  // Component data management
  public autoCompleteList = this.autocompleteService.getAvailableTechnicians(this.storageService.getLoggedUser());
  public enumEx = EnumEx;


  public constructor(
    public formBuilder: FormBuilder,
    private machineService: MachineService,
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
  }

  /** Form submit */

  //TODO: Finish
  public onSubmitCreate() : void {

    if (!this.technicianError) {

      let introducedMachine : Machine =
        new Machine(
          new Position(this.positionAddress),
          MachineType[this.machineType],
          MachineState[this.machineState],
          new Technician(this.technician),
          new Date(Date.now()),
          this.descriptionText
        );

      this.machineService.createMachine(introducedMachine).subscribe(
        (response: Response) => {

          console.log(response);

          this.machineCreatedOK();
        },
        (err) => {
          this.manageExternalError();
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
  public getAllMachineStates() : {} {
    return this.enumEx.getNames(MachineState);
  }


  /** Utility */

  private cleanForm() {
    //TODO: Restart form
  }

  private manageExternalError() {
    //TODO: Crear método para notificar al usuario que la inserción ha fallado
  }

  private machineCreatedOK() {
    //TODO: Crear método para notificar al usuario que la máquina se ha añadido (recargar vista de máquinas)
  }
}
