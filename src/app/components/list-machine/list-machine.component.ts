import {Machine} from "../../models/Machine";
import {MachineState} from "../../models/MachineState";
import {LocalesService} from "../../services/LocalesService";
import {MachineService} from "../../services/MachineService";
import {StorageService} from "../../services/StorageService";
import {Component, ViewContainerRef} from '@angular/core';
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory, Overlay, DialogRef} from "angular2-modal";
import {AddMachineComponent} from "../add-machine/add-machine.component";
import {UpdateMachineComponent} from "../update-machine/update-machine.component";
import {Response} from "@angular/http";
import {Technician} from "../../models/Technician";
import {Location} from "../../models/Location";


@Component({
  selector: 'list-machine',
  templateUrl: './list-machine.component.html',
  styleUrls: ['./list-machine.component.css'],
  providers : [Overlay]
})
export class ListMachineComponent {

  public listMachineLocales;

    // Component interaction data
  public machines : Machine[];
  public selections : boolean[];
  public numSelections: number = 0;

  constructor(
    public localesService: LocalesService,
    public machineService: MachineService,
    public store: StorageService,
    public vcRef: ViewContainerRef,
    public modal: Modal,
    public overlay: Overlay
  ) {

    this.modal.overlay = overlay;
    this.modal.overlay.defaultViewContainer = vcRef;
    this.selections = [];
    this.machines = [];

    this.listMachineLocales = localesService.get_ListMachineComponent_Locales();

    for (let i = 0; i < this.machines.length; i++)
      this.selections[i] = false;

    this.machineService.listMachines().subscribe(
      (response: Response) => {
        if (response.ok && response.json().success) {
          let data = response.json().data;

          for (let i = 0; i < data.length; i++) {
            let machine =
              new Machine(
                new Location(data[i].location.name),
                data[i].type,
                data[i].state,
                new Technician(''),
                data[i].description
              );

            this.machines.push(machine);
          }
        }

        else {
          //FIXME: Manage error
        }
      },
      (err) => {
        //FIXME: Manage error
      },
      () => {}
    );
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

    if (machinesSelected.length == 1) {
      // FIXME Arreglar que el tecnico de la maquina no se añade automaticamente en el formulario
      this.modal.open(
        UpdateMachineComponent,
        overlayConfigFactory({
          isBlocking: false,
          machine: machinesSelected[0]
        }, BSModalContext ));

    }
    else if (machinesSelected.length == 0) {
      this.modal.alert().body(this.listMachineLocales.no_selected_machine).open();
    }
    else {
      this.modal.alert().body(this.listMachineLocales.update_machines).open();
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
      this.modal.alert().body(this.listMachineLocales.no_selected_machine).open();
      return;
    }

    // Pone el texto correspondiente al aviso de borrado de maquinas
    let bodyext= "";

    if (machinesSelected.length == 1){
      bodyext = this.listMachineLocales.delete_a_machine;
    } else {
      bodyext = this.listMachineLocales.delete_machines;
    }

    // Muestra el aviso de confirmacion
    this.modal.confirm()
      .title(this.listMachineLocales.delete_confirm_title)
      .body(bodyext)
      .okBtn(this.listMachineLocales.delete_confirm_confirm_button)
      .cancelBtn(this.listMachineLocales.delete_confirm_cancel_button)
      .open()
      .then((resultPromise) => {
        resultPromise.result.then((result) => {
          // Aqui llega cuando el usuario pulsa el boton OPERATIVE
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

  private getSelectedMachines() : Machine[] {
    var machinesSelected : Machine[] = [];

    for (let i = 0 ; i < this.machines.length ; i++)
      if(this.selections[i])
        machinesSelected[machinesSelected.length] = this.machines[i];

    return machinesSelected;
  }

  public getMachineState(machineState : MachineState) : string {

    switch (machineState.toString().toUpperCase()) {
      case MachineState[MachineState.OPERATIVE]:
        return this.localesService.get_MachineStateModel_Locales().ok;

      case MachineState[MachineState.WAREHOUSE]:
        return this.localesService.get_MachineStateModel_Locales().almacenada;

      case MachineState[MachineState.OUT_OF_SERVICE]:
        return this.localesService.get_MachineStateModel_Locales().retirada;
    }
  }
}
