import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {MachineState} from "../../models/MachineState";
import {EnumEx} from "../../utils/EnumEx";
import {MachineType} from "../../models/MachineType";
import {DescriptionValidator} from "../../validators/description/DescriptionValidator";
import {PositionAddressValidator} from "../../validators/PositionAddressValidator";
import {Machine} from "../../models/Machine";
import {MachineService} from "../../services/MachineService";
import {Technician} from "../../models/Technician";
import {Location} from "../../models/Location";
import {LocalesService} from "../../services/LocalesService";
import {AutocompleteService} from "../../services/AutocompleteService";
import {StorageService} from "../../services/StorageService";
import {DialogRef, ModalComponent, CloseGuard} from "angular2-modal";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";
import {Response} from "@angular/http";

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

  // Data var
  public technician: string = "";

  // Errors management
  public technicianError: boolean = false;
  public technicianErrorHidden: boolean = true;

  // Component data management
  public autoCompleteList = this.autoCompleteService.getAvailableTechnicians(this.storageService.getLoggedUser());
  public enumEx = EnumEx;

  // Locales
  public updateMachineLocales;
  public formLocales;

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
      this.positionAddress = machine.location.name;
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

    this.updateMachineLocales = localesService.get_UpdateMachineComponent_Locales();
    this.formLocales = localesService.get_Forms_Locales();
  }

  public getTechnicianName() : string{
    return this.technician;
  }

  /** Form submit */

  public onSubmitUpdate() : void {

    if (!this.technicianError) {

      let introducedMachine : Machine =
        new Machine(
          new Location(this.positionAddress),
          MachineType[this.machineType],
          MachineState[this.machineState],
          new Technician(this.technician),
          this.descriptionText
        );

      this.machineService.updateMachine(introducedMachine).subscribe(
        (response: Response) => {
          if (response.ok) {
            this.cleanForm();
            this.machineUpdatedOK();
          }
          else
            this.manageExternalError(response.statusText);

        },
        (err) => {
          this.manageExternalError(err);
        },
        () => {}
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

  private manageExternalError(err) {
    //TODO: Crear método para notificar al usuario que la inserción ha fallado
  }

  private machineUpdatedOK() {
    //TODO: Crear método para notificar al usuario que la máquina se ha añadido
  }

}
