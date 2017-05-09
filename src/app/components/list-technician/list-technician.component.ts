import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Technician} from "../../models/Technician";
import {Modal, Overlay} from "angular2-modal";
import {LocalesService} from "../../services/LocalesService";
import {StorageService} from "../../services/StorageService";

@Component({
  selector: 'list-technician',
  templateUrl: './list-technician.component.html',
  styleUrls: ['./list-technician.component.css']
})
export class ListTechnicianComponent {

  // Component interaction data
  public technicians : Technician[];
  public selections : boolean[];
  public numSelections: number = 0;

  // Locales

  public listTechnicianLocales;
  public formLocales;

  constructor(
    public localesService: LocalesService,
    // TODO poner el servicio de tecnicos
    //public technicianService: TechnicianService,
    public store: StorageService,
    public vcRef: ViewContainerRef,
    public modal: Modal,
    public overlay: Overlay
  ) {

    this.modal.overlay = overlay;
    this.modal.overlay.defaultViewContainer = vcRef;
    this.selections = [];
    this.technicians = [new Technician("Bartolomeo"), new Technician("Burriana")];

    this.listTechnicianLocales = localesService.get_ListTechnicianComponent_Locales();
    this.formLocales = localesService.get_Forms_Locales();

    for (let i = 0; i < this.technicians.length; i++)
      this.selections[i] = false;
  }

  /** Actions */

  public selectRow(index: number) {

    if (this.selections[index] == false)
      this.numSelections += 1;

    else
      this.numSelections -= 1;

    this.selections[index] = !this.selections[index];
  }

  public update(){
    let selecteds = this.getSelecteds();
  }

  public delete(){
    let selecteds = this.getSelecteds();
  }

  public add(){
    let selecteds = this.getSelecteds();
  }

  /** Utility */

  private getSelecteds() : Technician[] {
    let selections : Technician[] = [];

    for (let i = 0 ; i < this.technicians.length ; i++)
      if(this.selections[i])
        selections[selections.length] = this.technicians[i];

    return selections;
  }
}
