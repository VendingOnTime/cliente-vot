import { Injectable } from '@angular/core';
import {StorageService} from "../StorageService";
import {ServerConfig} from "../../config/Server.config";
import {directions} from "../../config/server-directions/Server.directions";


@Injectable()
export class ServerDirectionService {

  private serverConfig : ServerConfig;
  private serverUrl : string;

  constructor(
    private storageService: StorageService
  ) {
    this.serverConfig = this.storageService.getServerConfig();
    this.serverUrl = `${this.serverConfig.secure ? 'https://' : 'http://'}${this.serverConfig.host}${this.serverConfig.secure ? '' : ':' + this.serverConfig.port}`;
  }


  public getServerBaseUrl() : string {
    return this.serverUrl;
  }


  /** UserService */

  public getLoginDirection() : string {
    return `${this.getServerBaseUrl()}${directions["api-v1"].login.root}`;
  }

  public getSignUpSupervisor() : string {
    return `${this.getServerBaseUrl()}${directions["api-v1"].signup.supervisor}`;
  }

  public getUpdateUserDirection() : string {
    return `${this.getServerBaseUrl()}${directions["api-v1"].users.root}`;
  }

  public getRetrieveUserDirection() : string {
    return `${this.getServerBaseUrl()}${directions["api-v1"].users.profile}`;
  }


  /** MachineService */

  public getMachinesDirection() : string {
    return `${this.getServerBaseUrl()}${directions["api-v1"].machines.root}`;
  }

  /** TechnicianService */

  public getTechnicianDirection() : string {
    return `${this.getServerBaseUrl()}${directions["api-v1"].technicians.root}`;
  }
}
