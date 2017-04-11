import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {MachineState} from "../../models/MachineState";
import {EnumEx} from "../../utils/EnumEx";
import {MachineType} from "../../models/MachineType";
import {DescriptionValidator} from "../../validators/DescriptionValidator";
import {PositionAddressValidator} from "../../validators/PositionAddressValidator";
import {Machine} from "../../models/Machine";
import {MachineService} from "../../services/MachineService";
import {Technician} from "../../models/Technician";
import {Position} from "../../models/Position";
import {LocalesService} from "../../services/LocalesService";
import {AutocompleteService} from "../../services/AutocompleteService";
import {StorageService} from "../../services/StorageService";
import {DialogRef, ModalComponent, CloseGuard} from "angular2-modal";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";

export class AdditionMachinePanelData extends BSModalContext {
  public machine: Machine;
}


@Component({
  selector: 'update-machine',
  templateUrl: 'update-machine.component.html',
  styleUrls: ['update-machine.component.css']
})

export class UpdateMachineComponent implements CloseGuard, ModalComponent<AdditionMachinePanelData> {

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

  // Data var
  private technician: string = "";

  // Errors management
  private technicianError: boolean = false;
  private technicianErrorHidden: boolean = true;

  // Component data management
  public autoCompleteList = this.autoCompleteService.getAvailableTechnicians(this.storageService.getLoggedUser());
  public enumEx = EnumEx;


  public constructor(
    public formBuilder: FormBuilder,
    public machineService: MachineService,
    public localesService : LocalesService,
    public autoCompleteService: AutocompleteService,
    public storageService: StorageService,
    public dialog: DialogRef<AdditionMachinePanelData>
  ) {

    let machine = dialog.context.machine;

    if (machine) {
      this.positionAddress = machine.position.address;
      this.descriptionText = machine.description;
      this.machineType = MachineType[machine.machineType];
      this.machineState = MachineState[machine.machineState];
      this.technician = machine.technician.name
    }

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

  public getTechnicianName() : string{
    return this.technician;
  }

  /** Form submit */

  public onSubmitUpdate() : void {

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

      if (this.machineService.updateMachine(introducedMachine)) {
        this.cleanForm();
        this.machineUpdatedOK();
      }
      else
        this.manageExternalError();
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
    }
    else {
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

  private machineUpdatedOK() {
    //TODO: Crear método para notificar al usuario que la máquina se ha añadido
  }

}
