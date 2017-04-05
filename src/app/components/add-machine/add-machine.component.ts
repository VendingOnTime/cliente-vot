import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {MachineState} from "../../models/MachineState";
import {EnumEx} from "../../utils/EnumEx";
import {MachineType} from "../../models/MachineType";
import {DescriptionValidator} from "../../validators/DescriptionValidator";
import {PositionAddressValidator} from "../../validators/PositionAddressValidator";
import {Machine} from "../../models/Machine";
import {MachineService} from "../../services/MachineService";
import {LocalesService} from "../../services/LocalesService";
import {AutocompleteService} from "../../services/AutocompleteService";
import {StorageService} from "../../services/StorageService";

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
    public storageService : StorageService
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

  public onSubmitCreate() : void {

    if (!this.technicianError) {

      let introducedMachine : Machine = {
        location : this.positionAddress,
        type : MachineType[this.machineType],
        state : MachineState[this.machineState],
        associatedTechnician : this.technician,
        description : this.descriptionText
      };

      if (this.machineService.createMachine(introducedMachine)) {
        this.cleanForm();
        this.machineCreatedOK();
      }
      else
        this.manageExternalError();
    }
  }


  /** Autocomplete management */

  public onNotify(event: string, list: {}) {
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
