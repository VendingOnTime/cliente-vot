import {Machine} from "../../models/Machine";
import {MachineState} from "../../models/MachineState";
import {LocalesService} from "../../services/LocalesService";
import {MachineService} from "../../services/MachineService";
import {StorageService} from "../../services/StorageService";
import {Component, ViewContainerRef} from '@angular/core';
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory, Overlay} from "angular2-modal";
import {AddMachineComponent} from "../add-machine/add-machine.component";
import {UpdateMachineComponent} from "../update-machine/update-machine.component";


@Component({
  selector: 'list-machine',
  templateUrl: './list-machine.component.html',
  styleUrls: ['./list-machine.component.css'],
  providers : [Overlay]
})
export class ListMachineComponent {
  private localesServiceList;

    // Component interaction data
  private machines : Machine[];
  private selections : boolean[];
  private numSelections: number = 0;

  constructor(
    public localesService: LocalesService,
    public machineService: MachineService,
    public store: StorageService,
    public vcRef: ViewContainerRef,
    public modal: Modal,
    public overlay: Overlay
  ) {
    this.machines = this.machineService.getMachines(this.store.getLoggedUser());

    this.modal.overlay = overlay;
    this.modal.overlay.defaultViewContainer = vcRef;
    this.selections = [];

    this.localesServiceList = localesService.get_ListMachineComponent_Locales();



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

    if (machinesSelected.length == 1){
      // FIXME Arreglar que el tecnico de la maquina no se añade automaticamente en el formulario
      this.modal.open(
        UpdateMachineComponent,
        overlayConfigFactory({
          isBlocking: false,
          machine: machinesSelected[0]
        }, BSModalContext ));

    } else if (machinesSelected.length == 0) {
      this.modal.alert().body(this.localesServiceList.no_selected_machine).open();
    } else {
      this.modal.alert().body(this.localesServiceList.update_machines).open();
    }
  }

  public addIssue() {
    let machinesSelected = this.getSelectedMachines();


    // TODO Completar
  }

  public deleteMachine() {
    let machinesSelected = this.getSelectedMachines();

    // Si no se han seleccionado maquinas avisa y sal
    if (machinesSelected.length == 0){
      this.modal.alert().body(this.localesServiceList.no_selected_machine).open();
      return;
    }

    // Pone el texto correspondiente al aviso de borrado de maquinas
    let bodyext= "";

    if (machinesSelected.length == 1){
      bodyext = this.localesServiceList.delete_a_machine;
    } else {
      bodyext = this.localesServiceList.delete_machines;
    }

    // Muestra el aviso de confirmacion
    this.modal.confirm()
      .title(this.localesServiceList.delete_confirm_title)
      .body(bodyext)
      .okBtn(this.localesServiceList.delete_confirm_confirm_button)
      .cancelBtn(this.localesServiceList.delete_confirm_cancel_button)
      .open()
      .then((resultPromise) => {
        resultPromise.result.then((result) => {
          // Aqui llega cuando el usuario pulsa el boton ok
          this.prueba(machinesSelected); // TODO Colocar servicio de borrado de maquina
        },
          () => {} // Aqui llega cuando pulsa cancel
        );
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
