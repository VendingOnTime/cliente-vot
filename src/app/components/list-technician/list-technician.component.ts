import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Technician} from "../../models/Technician";
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory, Overlay, DialogRef, CloseGuard} from "angular2-modal";
import {LocalesService} from "../../services/LocalesService";
import {StorageService} from "../../services/StorageService";
import {AddTechnicianComponent} from "../add-technician/add-technician.component";
import {TechnicianService} from "../../services/TechnicianService"
import {Response} from "@angular/http";

@Component({
  selector: 'list-technician',
  templateUrl: './list-technician.component.html',
  styleUrls: ['./list-technician.component.css'],
  providers : [Overlay]
})
export class ListTechnicianComponent implements CloseGuard{

  // Component interaction data
  public technicians : Technician[];
  public selections : boolean[];
  public numSelections: number = 0;

  // Locales

  public listTechnicianLocales;
  public formLocales;

  //
  public onCreatedTechnician;

  constructor(
    public localesService: LocalesService,
    public technicianService: TechnicianService,
    public store: StorageService,
    public vcRef: ViewContainerRef,
    public modal: Modal,
    public overlay: Overlay
  ) {

    this.modal.overlay = overlay;
    this.modal.overlay.defaultViewContainer = vcRef;
    this.selections = [];

    this.listTechnicianLocales = localesService.get_ListTechnicianComponent_Locales();
    this.formLocales = localesService.get_Forms_Locales();

    this.getTechnicians();

    this.onCreatedTechnician = AddTechnicianComponent.onCreateTechnician;

    this.onCreatedTechnician.subscribe(
      (created: boolean) => {
        this.getTechnicians();
      },(err) => {
        this.getTechnicians();
      },() => {
        this.getTechnicians();
      }
    );
  }

  public getTechnicians(){
    this.technicianService.listTechnicians().subscribe(
      (response: Response) => {
        if (response.ok && response.json().success) {
          let data = response.json().data;

          this.technicians = [];

          for (let i = 0; i < data.length; i++) {
            let technician = new Technician(data[i].name);

            technician.dni = data[i].dni;
            technician.surname = data[i].surnames;
            technician.email = data[i].email;
            technician.user = data[i].username;

            this.technicians.push(technician);
          }

          for (let i = 0; i < this.technicians.length; i++)
            this.selections[i] = false;

        } else {
          this.modal.alert().body(this.formLocales.error.undefinedError).open();
        }
      },
      (err) => {
        this.modal.alert().body(this.formLocales.error.undefinedError).open();
      },
      () => {}
    );
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

    if (selecteds.length == 0){
      this.modal.alert().body(this.listTechnicianLocales.no_selected).open();
      return;
    } else if ( selecteds.length > 1) {
      this.modal.alert().body(this.listTechnicianLocales.much_selected).open();
      return;
    } else {
      // TODO mostrar modal con el componente de update technician
    }
  }

  public delete(){
    let selecteds = this.getSelecteds();

    if (selecteds.length == 0){
      this.modal.alert().body(this.listTechnicianLocales.no_selected).open();
      return;
    } else {
      // Pone el texto correspondiente al aviso de borrado de maquinas
      let bodyext= "";

      if (selecteds.length == 1){
        bodyext = this.listTechnicianLocales.delete_confirm_body;
      } else {
        bodyext = this.listTechnicianLocales.delete_confirm_body_mult;
      }

      // Muestra el aviso de confirmacion
      this.modal.confirm()
        .title(this.listTechnicianLocales.delete_confirm_title)
        .body(bodyext)
        .okBtn(this.listTechnicianLocales.delete_confirm_confirm_button)
        .cancelBtn(this.listTechnicianLocales.delete_confirm_cancel_button)
        .open()
        .then((resultPromise) => {
          resultPromise.result.then((result) => {
              // Aqui llega cuando el usuario pulsa el boton OPERATIVE
              this.prueba(selecteds); // TODO Colocar servicio de borrado de tecnico
            },
            () => {} // Aqui llega cuando pulsa cancel
          );
        });
    }
  }

  // TODO quitar cuando se implemente el bueno
  public prueba(technicians : Technician[]){
    for (let i = 0 ; i<technicians.length;i++) {
      console.log(technicians[i].name);
    }
  }

  public add(){
    this.modal.open(AddTechnicianComponent, overlayConfigFactory({ isBlocking: false }, BSModalContext));
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
