import { Component, OnInit } from '@angular/core';
import {Machine} from "../../models/Machine";
import {MachineType} from "../../models/MachineType";
import {MachineState} from "../../models/MachineState";

@Component({
  selector: 'list-machine',
  templateUrl: './list-machine.component.html',
  styleUrls: ['./list-machine.component.css']
})
export class ListMachineComponent implements OnInit {

  private machines : [Machine];
  private selections : boolean[];
  private numSelections: number = 0;

  constructor() {
    this.machines = this.getList();

    this.selections = [];

    for (let i = 0; i < this.machines.length; i++){
      this.selections[i] = false;
    }
  }

  ngOnInit() {
  }

  getList() : [Machine] {

    // TODO Inicializar lista de maquians

    let mac1 : Machine = new Machine();

    mac1.id = "prueba";
    mac1.machineState = MachineState.ok;
    mac1.machineType = MachineType.Right;

    let mac2 : Machine = new Machine();

    mac2.id = "prueba2";
    mac2.machineState = MachineState.ok;
    mac2.machineType = MachineType.Right;

    return [mac1,mac2];

  }

  selectFile(index: number){

    if (this.selections[index] == false){
      this.numSelections += 1;
    } else {
      this.numSelections -= 1;
    }

    this.selections[index] = !this.selections[index];
    console.log("El indece es   "+ this.selections[index]);
  }

  update(){
    let machinesSelected = this.getSelectedMachines();

    for (let i = 0 ; i<machinesSelected.length;i++){
        console.log(machinesSelected[i].id);
    }

    // TODO Completar

  }
  setTecnician(){
    let machinesSelected = this.getSelectedMachines();

    // TODO Completar

  }
  addIssue(){
    let machinesSelected = this.getSelectedMachines();


    // TODO Completar
  }
  delete(){
    let machinesSelected = this.getSelectedMachines();

    // TODO Completar

  }
  addMachine(){
    let machinesSelected = this.getSelectedMachines();

    // TODO Completar
  }

  private getSelectedMachines() : Machine[]{
    var machinesSelected : Machine[] = [];

    for (let i = 0 ; i < this.machines.length ; i++){
      if(this.selections[i]){
        machinesSelected[machinesSelected.length] = this.machines[i];
      }
    }

    return machinesSelected;
  }
}
