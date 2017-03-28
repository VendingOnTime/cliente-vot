import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Location} from "../../models/Location";
import {tick} from "@angular/core/testing";
import {MachineType} from "../../models/MachineType";

@Component({
  selector: 'add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent implements OnInit {

  private form : FormGroup;

  private locationInput: AbstractControl;
  private location: Location;
  private locationError : string = "Error!";

  private machineTypeInput: AbstractControl;
  private machineType: MachineType;
  private machineTypeError: string = "Se ha de seleccionar un tipo";

  private stateInput: AbstractControl;
  //private state: machineState;
  //private stateError: machineState;

  private technicianInput: AbstractControl;
  //private technician: Technician;
  //private technicianError: Technician;

  private notesInput: AbstractControl;
  private notes: String;
  private notesError: String;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      location: new FormControl('', Validators.compose([Validators.required])),
      machineType: new FormControl('', Validators.compose([Validators.required])),
      //state: new FormControl('', Validators.compose([Validators.required])),
      //technician: new FormControl('', Validators.compose([Validators.required])),
      notes: new FormControl('', Validators.compose([Validators.required]))
    });
    this.locationInput = this.form.controls['location'];
    this.machineTypeInput = this.form.controls['machineType'];
    //this.stateInput = this.form.controls['state'];
    //this.technicianInput = this.form.controls['technician']
    this.notesInput = this.form.controls['notes']
  }

  ngOnInit() {


  }

  public onSubmitCreate() : void{
    console.log("sdfsafsafsaffsdfsadfsdfaf  " + this.machineType)
  }

  public getAllMachineTypes() : string[] {
    var n = [];

    for (var value in MachineType) {
      if(typeof MachineType[value] !== 'number') {
        n.push(MachineType[value]);
      }
    }

    return n;
  }

}
