import {Injectable} from "@angular/core";
import {StorageService} from "./StorageService";
import {Languages} from "../config/locales/Languages";
import {es_locales} from "../config/locales/es_locales";

@Injectable()
export class LocalesService {


  constructor(private storageService : StorageService) {}


  /** Component strings */

  public get_Forms_Locales() {
    switch (this.storageService.getLanguage()) {
      case Languages.ES:
        return es_locales.forms;
    }
  }

  public get_AddMachineComponent_Locales() {
    switch (this.storageService.getLanguage()) {
      case Languages.ES:
        return es_locales.component.add_machine;
    }
  }

  public get_ListMachineComponent_Locales() {
    switch (this.storageService.getLanguage()) {
      case Languages.ES:
        return es_locales.component.list_machine;
    }
  }

  public get_MachineStateModel_Locales() {
    switch (this.storageService.getLanguage()) {
      case Languages.ES:
        return es_locales.model.machineState;
    }
  }

  public get_LoginPanelComponent_Locales() {
    switch (this.storageService.getLanguage()) {
      case Languages.ES:
        return es_locales.component.login_panel;
    }
  }

  public get_UpdateMachineComponent_Locales() {
    switch (this.storageService.getLanguage()) {
      case Languages.ES:
        return es_locales.component.update_machine;
    }
  }

  public get_AutoCompleteComponent_Locales() {
    switch (this.storageService.getLanguage()) {
      case Languages.ES:
        return es_locales.component.autocomplete;
    }
  }

  public get_NavigationBarComponent_Locales() {
    switch (this.storageService.getLanguage()) {
      case Languages.ES:
        return es_locales.component.navigation_bar;
    }
  }

  public get_SignUpComponent_Locales() {
    switch (this.storageService.getLanguage()) {
      case Languages.ES:
        return es_locales.component.signUp_panel;
    }
  }

  public get_UpdateUserComponent_Locales() {
    switch (this.storageService.getLanguage()) {
      case Languages.ES:
        return es_locales.component.update_user;
    }
  }
  public get_TechniciansPanelComponent_Locales() {
    switch (this.storageService.getLanguage()) {
      case Languages.ES:
        return es_locales.technicians_panel;
    }
  }
}
