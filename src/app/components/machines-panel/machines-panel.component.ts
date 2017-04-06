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

@Component({
  selector: 'machines-panel',
  templateUrl: './machines-panel.component.html',
  styleUrls: ['./machines-panel.component.css']
})
export class MachinesPanelComponent {


  private form : FormGroup;

  private positionAddressInput: AbstractControl;
  private positionAddress: string;
  private positionAddressError : string = "El campo es requerido";

  private machineTypeInput: AbstractControl;
  private machineType: string = MachineType[0];
  private machineTypeError: string = "Se ha de seleccionar un tipo";

  private machineStateInput: AbstractControl;
  private machineState: string = MachineState[0];
  private machineStateError: string = "Error";

  private technician: string = "";
  private technicianError: boolean = false;
  private technicianErrorHidden: boolean = true;

  private descriptionInput: AbstractControl;
  private descriptionText: string;
  private descriptionError: string = " Error ";

  public enumEx = EnumEx;

  constructor(public formBuilder: FormBuilder, private machineService: MachineService) {
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

  public onSubmitUpdate() : void {

    if (!this.technicianError) {

      let introducedMachine : Machine =
        new Machine(
          new Position(this.positionAddress),
          MachineType[this.machineType],
          MachineState[this.machineState],
          new Technician(this.technician),
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

  // Con este metodo se recupera el resultado de la lista de busqueda
  onNotify(event: string, list: {}) {
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

  private machineUpdatedOK() {
    //TODO: Crear método para notificar al usuario que la máquina se ha añadido
  }

}
