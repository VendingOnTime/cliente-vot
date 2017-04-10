import { Component, OnInit } from '@angular/core';
import {Machine} from "../../models/Machine";
import {MachineType} from "../../models/MachineType";
import {MachineState} from "../../models/MachineState";
import {LocalesService} from "../../services/LocalesService";
import {MachineService} from "../../services/MachineService";
import {StorageService} from "../../services/StorageService";

@Component({
  selector: 'list-machine',
  templateUrl: './list-machine.component.html',
  styleUrls: ['./list-machine.component.css']
})
export class ListMachineComponent {

  // Component interaction data
  private machines : Machine[];
  private selections : boolean[];
  private numSelections: number = 0;


  constructor(
    public localesService: LocalesService,
    public machineService: MachineService,
    public store: StorageService
  ) {
    this.machines = this.machineService.getMachines(this.store.getLoggedUser());

    this.selections = [];

    for (let i = 0; i < this.machines.length; i++)
      this.selections[i] = false;
  }


  /** Actions */

  public selectMachine(index: number) {

    if (this.selections[index] == false)
      this.numSelections += 1;

    else
      this.numSelections -= 1;


    this.selections[index] = !this.selections[index];
  }

  public update() {
    let machinesSelected = this.getSelectedMachines();

    for (let i = 0 ; i<machinesSelected.length;i++)
        console.log(machinesSelected[i].id);


    // TODO Completar

  }

  public setTecnician() {
    let machinesSelected = this.getSelectedMachines();

    // TODO Completar

  }

  public addIssue() {
    let machinesSelected = this.getSelectedMachines();


    // TODO Completar
  }

  public deleteMachine() {
    let machinesSelected = this.getSelectedMachines();

    // TODO Completar
  }

  public addMachine() {
    let machinesSelected = this.getSelectedMachines();

    // TODO Completar
  }


  /** Utility */

  private getSelectedMachines() : Machine[]{
    var machinesSelected : Machine[] = [];

    for (let i = 0 ; i < this.machines.length ; i++)
      if(this.selections[i])
        machinesSelected[machinesSelected.length] = this.machines[i];

    return machinesSelected;
  }

  public getMachineState(machineState : MachineState) : string {

    let OK = MachineState.ok;
    let retirada = MachineState.retirada;

    switch (machineState) {

      case OK:
        return this.localesService.get_MachineStateModel_Locales().ok;

      case retirada:
        return this.localesService.get_MachineStateModel_Locales().retirada;
    }

  }
}
