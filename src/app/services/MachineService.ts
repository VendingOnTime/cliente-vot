import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptionsArgs} from "@angular/http";
import {Machine} from "../models/Machine";
import {StorageService} from "./StorageService";
import {ServerConfig} from "../config/Server.config";
import {User} from "../models/User";
import {MachineState} from "../models/MachineState";
import {MachineType} from "../models/MachineType";
import {Location} from "../models/Location";
import {Technician} from "../models/Technician";
import {Observable} from "rxjs";
import {ServerDirectionService} from "./server-direction/server-direction.service";


@Injectable()
export class MachineService {

  //TODO: TEST
  constructor(
    private http: Http,
    private serverDirection: ServerDirectionService,
    private storageService: StorageService
  ) { }


  /** Action methods */

  public createMachine(newMachine : Machine) : Observable<Response> {
    let serverUrl : string = this.serverDirection.getMachinesDirection();

    let machineJson = {location: {name: newMachine.location.name}, type: MachineType[newMachine.machineType], state: MachineState[newMachine.machineState], description: newMachine.description};

    let headers = this.applyToken();

    return this.http.post(serverUrl, machineJson, {headers});
  }

  public updateMachine(changedMachine : Machine) : Observable<Response> {
    let serverUrl : string = this.serverDirection.getMachinesDirection();
    let body : string = JSON.stringify(changedMachine);

    let headers = this.applyToken();

    return this.http.put(serverUrl, body, {headers});
  }

  public listMachines() : Observable<Response> {
    let serverUrl : string = this.serverDirection.getMachinesDirection();

    let headers = this.applyToken();

    return this.http.get(serverUrl, {headers});
  }

  public getMachine(machineID: string) : Observable<Response> {
    let serverUrl : string = `${this.serverDirection.getMachinesDirection()}/${machineID}`;

    let headers = this.applyToken();

    return this.http.get(serverUrl, {headers});
  }

  public deleteMachine(machineID: string) : Observable<Response> {
    let serverUrl : string = `${this.serverDirection.getMachinesDirection()}/${machineID}`;

    let headers = this.applyToken();

    return this.http.delete(serverUrl, {headers});
  }


  /** Utility */

  private applyToken() : Headers {
    let token = '';
    let headers: Headers;

    this.storageService.getUserReducer().subscribe((userReducer) => {
      token = localStorage.getItem('token');

      headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      });
    });

    return headers;
  }
}
