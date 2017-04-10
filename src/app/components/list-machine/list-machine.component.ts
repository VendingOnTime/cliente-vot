import {Machine} from "../../models/Machine";
import {MachineState} from "../../models/MachineState";
import {LocalesService} from "../../services/LocalesService";
import {MachineService} from "../../services/MachineService";
import {StorageService} from "../../services/StorageService";
import {Component, ViewContainerRef} from '@angular/core';
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory} from "angular2-modal";
import {AddMachineComponent} from "../add-machine/add-machine.component";
import {UpdateMachineComponent} from "../update-machine/update-machine.component";


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
    public store: StorageService,
    public vcRef: ViewContainerRef,
    public modal: Modal
  ) {
    this.machines = this.machineService.getMachines(this.store.getLoggedUser());
    this.modal.overlay.defaultViewContainer = vcRef;
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

    // TODO Completar

    for (let i = 0 ; i<machinesSelected.length;i++) {
      //console.log(machinesSelected[i].id);
    }
    if (machinesSelected.length == 1){
      // FIXME Arreglar que el tecnico de la maquina no se añade automaticamente en el formulario
      this.modal.open(UpdateMachineComponent, overlayConfigFactory({ isBlocking: false,  machine: machinesSelected[0] }, BSModalContext));
    } else if (machinesSelected.length == 0) {
      this.modal.alert().body("Debes seleccionar una máquina").open();
    } else {
      this.modal.alert().body("Debes seleccionar una sola máquina").open();
    }
  }

  public setTecnician() {
    let machinesSelected = this.getSelectedMachines();

    // TODO Elimnar esta opcion (Se hace desde modificar maquina)

  }

  public addIssue() {
    let machinesSelected = this.getSelectedMachines();


    // TODO Completar
  }

  public deleteMachine() {
    let machinesSelected = this.getSelectedMachines();

    this.modal.confirm()
      .title("Precaución")
      .body("¿Se encuentra seguro de que desea eliminar la máquina seleccionada")
      .okBtn('Save')
      .cancelBtn('Cancel')
      .open()
      .then((resultPromise) => {
        resultPromise.result.then((result) => {
          this.prueba(machinesSelected); // TODO Colocar servicio de borrado de maquina
        }, () => {} );
      });
  }

  // TODO quitar cuando se implemente el bueno
  public prueba(machinesSelected : Machine[]){
    for (let i = 0 ; i<machinesSelected.length;i++) {
      console.log(machinesSelected[i].id);
    }
  }
  public addMachine() {
    this.modal.open(AddMachineComponent, overlayConfigFactory({ isBlocking: false }, BSModalContext));
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
