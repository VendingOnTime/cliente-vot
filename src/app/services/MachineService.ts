import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Machine} from "../models/Machine";
import {StorageService} from "./StorageService";
import {ServerConfig} from "../config/Server.config";
import {User} from "../models/User";
import {MachineState} from "../models/MachineState";
import {MachineType} from "../models/MachineType";
import {Position} from "../models/Position";
import {Technician} from "../models/Technician";
import {Observable} from "rxjs";


@Injectable()
export class MachineService {

  private serverConfig : ServerConfig;
  //FIXME: Use real direction
  private CREATE_MACHINE_DIRECTION : string = '/api-v1/machines';
  private GET_MACHINES_DIRECTION : string = '';

  constructor(private http: Http, private storageService: StorageService) {
    this.serverConfig = storageService.getServerConfig();
  }


  /** Action methods */

  public createMachine(newMachine : Machine) : Observable<Response> {
    //TODO: Test against the server
    let serverUrl : string = `${this.serverConfig.secure ? 'https://' : 'http://'}${this.serverConfig.host}:${this.serverConfig.port}${this.CREATE_MACHINE_DIRECTION}`;
    let body : string = JSON.stringify(newMachine);

    return this.http.post(serverUrl, body);
  }

  //TODO: Finish
  public updateMachine(changedMachine : Machine) {

  }

  public getMachines(loggedUser : User) : Machine[] {
    //TODO: Test against the server
    let serverUrl : string = `${this.serverConfig.secure ? 'https://' : 'http://'}${this.serverConfig.host}:${this.serverConfig.port}${this.GET_MACHINES_DIRECTION}`;
    let OK : boolean;
    let data : any;

    this.http.get(serverUrl).subscribe(
      (response: Response) => {OK = true; data = response.json()},
      (error) => {OK = false},
      () => {}
    );

    //FIXME: Mock data

    let mac1 : Machine = new Machine(
      new Position("Mock position 1"),
      MachineType.Down,
      MachineState.ok,
      new Technician("Bartolomeo"),
      new Date(Date.now()),
      "Mock"
    );

    let mac2 : Machine = new Machine(
      new Position("Mock position 2"),
      MachineType.Left,
      MachineState.retirada,
      new Technician("Burriana"),
      new Date(Date.now()),
      "Mock"
    );

    return [mac1,mac2];
  }

  //TODO: Complete methods

}
