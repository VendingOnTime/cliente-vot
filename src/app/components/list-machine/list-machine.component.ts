import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Machine2} from "../../models/Machine";
import {MachineType} from "../../models/MachineType";
import {MachineState} from "../../models/MachineState";
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory, Overlay} from "angular2-modal";
import {AddMachineComponent} from "../add-machine/add-machine.component";
import {MachinesPanelComponent, AdditionMachinePanelData} from "../machines-panel/machines-panel.component";
import {Position} from "../../models/Position";

@Component({
  selector: 'list-machine',
  templateUrl: './list-machine.component.html',
  styleUrls: ['./list-machine.component.css']
})
export class ListMachineComponent implements OnInit {

  private machines : [Machine2];
  private selections : boolean[];
  private numSelections: number = 0;

  constructor(vcRef: ViewContainerRef, public modal: Modal) {
    this.modal.overlay.defaultViewContainer = vcRef;

    this.machines = this.getList();

    this.selections = [];

    for (let i = 0; i < this.machines.length; i++){
      this.selections[i] = false;
    }
  }

  ngOnInit() {
  }

  getList() : [Machine2] {

    // TODO Inicializar lista de maquians

    let mac1 : Machine2 = new Machine2();

    mac1.id = "prueba";
    mac1.machineState = MachineState.ok;
    mac1.machineType = MachineType.Down;
    mac1.description = "Descripcion";
    mac1.position = new Position();
    mac1.position.address = "Direccion";
    mac1.technician.name = "Bartolomeo";

    let mac2 : Machine2 = new Machine2();

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
    //console.log("El indece es   "+ this.selections[index]);
  }

  update(){
    let machinesSelected = this.getSelectedMachines();

    // TODO Completar

    for (let i = 0 ; i<machinesSelected.length;i++) {
      //console.log(machinesSelected[i].id);
    }
    if (machinesSelected.length == 1){
      // FIXME Arreglar que el tecnico de la maquina no se añade automaticamente en el formulario
      this.modal.open(MachinesPanelComponent, overlayConfigFactory({ isBlocking: false,  machine: machinesSelected[0] }, BSModalContext));
    } else if (machinesSelected.length == 0) {
      this.modal.alert().body("Debes seleccionar una máquina").open();
    } else {
      this.modal.alert().body("Debes seleccionar una sola máquina").open();
    }



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
    // TODO Completar
    this.modal.open(AddMachineComponent, overlayConfigFactory({ isBlocking: false }, BSModalContext));
  }

  private getSelectedMachines() : Machine2[]{
    var machinesSelected : Machine2[] = [];

    for (let i = 0 ; i < this.machines.length ; i++){
      if(this.selections[i]){
        machinesSelected[machinesSelected.length] = this.machines[i];
      }
    }

    return machinesSelected;
  }
}
