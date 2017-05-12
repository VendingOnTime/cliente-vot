import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptionsArgs} from "@angular/http";
import {StorageService} from "./StorageService";
import {Technician} from "../models/Technician";
import {Observable} from "rxjs";
import {ServerDirectionService} from "./server-direction/server-direction.service";


@Injectable()
export class TechnicianService {

  //TODO: TEST
  constructor(private http: Http,
              private serverDirection: ServerDirectionService,
              private storageService: StorageService) {
  }


  /** Action methods */

  public createTechnician(newTechnician: Technician): Observable<Response> {
    let serverUrl: string = this.serverDirection.getTechnicianDirection();

    let json = {

        dni: newTechnician.dni,
        username: newTechnician.user,
        email: newTechnician.email,
        name: newTechnician.name,
        surnames: newTechnician.surname,
        password: newTechnician.password,
        role: "TECHNICIAN"

    };

    let headers = this.applyToken();

    return this.http.post(serverUrl, json, {headers});
  }

  public listTechnicians() : Observable<Response> {
    let serverUrl : string = this.serverDirection.getTechnicianDirection();

    let headers = this.applyToken();

    return this.http.get(serverUrl, {headers});
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
