import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {MachineState} from "../../models/MachineState";
import {EnumEx} from "../../utils/EnumEx";
import {MachineType} from "../../models/MachineType";
import {DescriptionValidator} from "../../validators/DescriptionValidator";
import {PositionAddressValidator} from "../../validators/PositionAddressValidator";

@Component({
  selector: 'add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent implements OnInit {

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
  private technicianError: boolean = true;
  private technicianErrorHidden: boolean = true;

  private descriptionInput: AbstractControl;
  private descriptionText: string;
  private descriptionError: string = " Error ";

  public enumEx = EnumEx;

  constructor(public formBuilder: FormBuilder) {
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

  ngOnInit() {


  }

  public onSubmitCreate() : void{
    // TODO Falta conectarlo a la clase de servicio

    if (!this.technicianError){
      console.log("positionAddress   " + this.positionAddress);
      console.log("Machine state  " + MachineState[this.machineState]);
      console.log("Machine type  " + MachineType[this.machineType]);
      console.log("El tecnico es    "  +  this.technician);
      console.log("Descripción  " + this.descriptionText);
    }
  }

  public getAllMachineTypes() : string[] {
    return this.enumEx.getNames(MachineType);
  }
  public getAllMachineStates() : {} {
    return this.enumEx.getNames(MachineState);
  }

  // Con este metodo se recupera el resultado de la lista de busqueda
  onNotify(event:string, list:{}){
    this.technician = event;

    // Maneja la validacion del error
    // TODO Ver si se puede hacer algo para manejar esto como los demas
    if (this.technician == ""){
      this.technicianError = true;
      this.technicianErrorHidden = false;
    }else {
      this.technicianError = false;
      this.technicianErrorHidden = true;
    }
  }
}
