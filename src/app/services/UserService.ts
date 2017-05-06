import {Http, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {StorageService} from "./StorageService";
import {User} from "../models/User";
import {ServerConfig} from "../config/Server.config";
import {Observable} from "rxjs";
import {ServerDirectionService} from "./server-direction/server-direction.service";

@Injectable()
export class UserService {

  public constructor(
    private http: Http,
    private serverDirection: ServerDirectionService
  ) {

  }


  /** Actions */

  public doLogin(email: string, password: string) : Observable<Response> {
    let serverUrl : string = this.serverDirection.getLoginDirection();
    let body = {email, password};

    return this.http.post(serverUrl, body);
  }

  public signUpSupervisor(username: string, password: string, email: string) : Observable<Response> {
    let serverUrl : string = this.serverDirection.getSignUpSupervisor();
    let body = {username, password, email};

    return this.http.post(serverUrl, body);
  }

  public updateUser(email: string, newPassword: string) : Observable<Response> {
    let serverUrl : string = this.serverDirection.getUpdateUserDirection();
    let body = {email, newPassword};

    return this.http.put(serverUrl, body);
  }

  public retrieveUser(token: string) : Observable<Response> {
    let serverUrl : string = this.serverDirection.getRetrieveUserDirection();
    let jwtToken = `JWT ${token}`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    });

    return this.http.get(serverUrl, {headers});
  }


  /** Utility */

  public buildUser(data : any) : User {
    let userData = data;
    let user = new User();
    user.name = userData.name;
    user.surnames = userData.surnames;
    user.dni = userData.dni;
    user.email = userData.email;
    user.id = userData.id;
    user.role = userData.role;
    user.username = userData.username;
    return user;
  }
}
