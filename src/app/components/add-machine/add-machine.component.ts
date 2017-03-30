import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Position} from "../../models/Position";
import {MachineState} from "../../models/MachineState";
import {EnumEx} from "../../utils/EnumEx";
import {MachineType} from "../../models/MachineType";

@Component({
  selector: 'add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent implements OnInit {

  private form : FormGroup;

  private positionAddressInput: AbstractControl;
  private positionAddress: string;
  private positionAddressError : string = "Error!";

  private machineTypeInput: AbstractControl;
  private machineType: string = MachineType[0];
  private machineTypeError: string = "Se ha de seleccionar un tipo";

  private machineStateInput: AbstractControl;
  private machineState: string = MachineState[0];
  private machineStateError: string = "Error";

  //private technicianInput: AbstractControl;
  //private technician: Technician;
  //private technicianError: Technician;

  private descriptionInput: AbstractControl;
  private description: String;
  private descriptionError: String;

  public enumEx = EnumEx;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      positionAddress: new FormControl('', Validators.compose([Validators.required])),
      machineType: new FormControl('', Validators.compose([Validators.required])),
      machineState: new FormControl('', Validators.compose([Validators.required])),
      //technician: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required]))
    });

    this.positionAddressInput = this.form.controls['positionAddress'];
    this.machineTypeInput = this.form.controls['machineType'];
    this.machineStateInput = this.form.controls['machineState'];
    //this.technicianInput = this.form.controls['technician'];
    this.descriptionInput = this.form.controls['description'];
  }

  ngOnInit() {


  }

  public onSubmitCreate() : void{

    console.log("positionAddress   " + this.positionAddress);
    console.log("Machine state  " + MachineState[this.machineState]);
    console.log("Machine type  " + MachineType[this.machineType]);
    console.log("Descripción  " + this.description);
  }

  public getAllMachineTypes() : string[] {
    return this.enumEx.getNames(MachineType);
  }
  public getAllMachineStates() : {} {
    return this.enumEx.getNames(MachineState);
  }

}
