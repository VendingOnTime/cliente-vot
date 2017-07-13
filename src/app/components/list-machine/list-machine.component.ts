import {Machine} from "../../models/Machine";
import {MachineState} from "../../models/MachineState";
import {LocalesService} from "../../services/LocalesService";
import {MachineService} from "../../services/MachineService";
import {StorageService} from "../../services/StorageService";
import {Component, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory} from "angular2-modal";
import {AddMachineComponent} from "../add-machine/add-machine.component";
import {UpdateMachineComponent} from "../update-machine/update-machine.component";
import {Response} from "@angular/http";
import {Technician} from "../../models/Technician";
import {Location} from "../../models/Location";


@Component({
  selector: 'list-machine',
  templateUrl: './list-machine.component.html',
  styleUrls: ['./list-machine.component.css']
})
export class ListMachineComponent {

  public listMachineLocales;

    // Component interaction data
  public machines : Machine[];
  public selections : boolean[];
  public numSelections: number = 0;

  public onCreatedMachine = AddMachineComponent.onCreatedMachine;
  public onDeletedMachine = new EventEmitter(true);

  constructor(
    public localesService: LocalesService,
    public machineService: MachineService,
    public store: StorageService,
    public modal: Modal,
    public cdr: ChangeDetectorRef
  ) {

    this.selections = [];
    this.machines = [];

    this.listMachineLocales = localesService.get_ListMachineComponent_Locales();

    this.onCreatedMachine.subscribe((created: boolean) => {this.getMachines()});

    this.onDeletedMachine.subscribe((deleted: boolean) => {
      this.getMachines();
      this.numSelections = 0;
      this.cdr.detectChanges();
    });

    this.getMachines();
  }


  /** Actions */

  public getMachines() {
    this.machineService.listMachines().subscribe(
      (response: Response) => {
        if (response.ok && response.json().success) {
          let data = response.json().data;

          this.machines = [];

          for (let i = 0; i < data.length; i++) {
            let machine =
              new Machine(
                new Location(data[i].location.name),
                data[i].type,
                data[i].state,
                //FIXME: Workaround until have the technician in the response
                new Technician(''),
                data[i].description
              );

            machine.id = data[i].id;

            this.machines.push(machine);
          }

          for (let i = 0; i < this.machines.length; i++)
            this.selections[i] = false;
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

  public selectMachine(index: number) {

    if (this.selections[index] == false)
      this.numSelections += 1;

    else
      this.numSelections -= 1;

    this.selections[index] = !this.selections[index];
  }

  public addIssue() {
    let machinesSelected = this.getSelectedMachines();


    // TODO Completar
  }

  public deleteMachine() {
    let machinesSelected : Machine[] = this.getSelectedMachines();

    // Si no se han seleccionado maquinas avisa y sal
    if (machinesSelected.length == 0) {
      this.modal.alert().body(this.listMachineLocales.no_selected_machine).open();
      return;
    }

    // Pone el texto correspondiente al aviso de borrado de maquinas
    let bodyext= "";

    if (machinesSelected.length == 1) {
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

          let err : boolean = false;
          let deleteErr : boolean = false;
          let i : number = 0;
          let subscriptionStateClosed : boolean = true;

          while (i < machinesSelected.length) {
            this.machineService.deleteMachine(machinesSelected[i].id).subscribe(
              (deletedOK: Response) => {

                if (deletedOK.ok) {
                  let newMachinesList : Machine[] = [];
                  let newSelectionList : boolean[] = [];

                  for (let j = 0; j < machinesSelected.length; j++) {
                    for (let k = this.machines.length - 1; k >= 0; k--) {
                      if (this.machines[k].id !== machinesSelected[j].id) {
                        newMachinesList.push(this.machines[k]);
                        break;
                      }
                    }
                  }

                  for (let i = 0; i < newMachinesList.length; i++)
                    newSelectionList.push(false);

                  this.machines = newMachinesList;
                  this.selections = newSelectionList;
                }
                else
                  deleteErr = true;

              },
              (error) => {
                err = true;
              }
            );

            if (err) {
              this.modal.alert().body('No se han podido eliminar las máquinas. ¿Está conectado a internet?').open();
              break;
            }

            else if (deleteErr) {
              this.modal.alert().body('Ha habido un error en el servidor al intentar eliminar las máquinas.').open();
              break;
            }

            i++;
          }
        },
          () => {} // Aqui llega cuando pulsa cancel
        ).then(() => {this.onDeletedMachine.emit(true)});
      });
  }
  public addMachine() {
    this.modal.open(AddMachineComponent, overlayConfigFactory({ isBlocking: false }, BSModalContext));
  }

  public showMachineData(machine: Machine) {
    let addMachine = AddMachineComponent;
    this.modal.open(addMachine, overlayConfigFactory({ isBlocking: false }, BSModalContext));
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

  public updateMachineListCounter() {
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
}
