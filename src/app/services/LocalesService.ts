import {Injectable} from "@angular/core";
import {StorageService} from "./StorageService";
import {Languages} from "../config/locales/Languages";
import {es_locales} from "../config/locales/es_locales";

@Injectable()
export class LocalesService {


  constructor(private storageService : StorageService) {}


  /** Component strings */

  public get_AddMachineComponent_Locales() {

    switch (this.storageService.getLanguage()) {

      case Languages.ES:
        return es_locales.component.add_machine;
    }

  }

}
