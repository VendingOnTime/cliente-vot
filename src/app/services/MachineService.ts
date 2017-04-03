import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Machine} from "../models/Machine";
import {StorageService} from "./StorageService";
import {ServerConfig} from "../environment/Server.config";

@Injectable()
export class MachineService {

  private serverConfig : ServerConfig;
  //FIXME: Use real direction
  private CREATE_MACHINE_DIRECTION : string = '';

  constructor(private http: Http, private storageService: StorageService) {
    this.serverConfig = storageService.getServerConfig();
  }


  /** Action methods */

  public createMachine(newMachine : Machine) : boolean {
    //TODO: Test against the server
    let serverUrl : string = `${this.serverConfig.secure ? 'https://' : 'http://'}${this.serverConfig.host}:${this.serverConfig.port}${this.CREATE_MACHINE_DIRECTION}`;
    let body : string = JSON.stringify(newMachine);
    let OK : boolean;

    this.http.post(serverUrl, body).subscribe(
      (response : Response) => {OK = true},
      (error) => {OK = false},
      () => {}
    );

    return OK;
  }

  //TODO: Complete methods

}
