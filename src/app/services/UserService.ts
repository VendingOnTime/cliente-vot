import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {StorageService} from "./StorageService";
import {User} from "../models/User";
import {ServerConfig} from "../environment/Server.config";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  private serverConfig : ServerConfig;
  //FIXME: Include real directions
  private REGISTER_USER_DIRECTION = '/api-v1/signup/supervisor';
  private LOGIN_USER_DIRECTION = '/api-v1/login';
  private UPDATE_USER_DIRECTION ='';


  public constructor(private http: Http, private storage: StorageService) {
    this.serverConfig = this.storage.getServerConfig();
  }


  /** Actions */

  //TODO: Finish
  public doLogin(username: string, password: string) : boolean {
    let serverUrl : string = `${this.serverConfig.secure ? 'https://' : 'http://'}${this.serverConfig.host}:${this.serverConfig.port}${this.LOGIN_USER_DIRECTION}`;
    let body = {username, password};
    let OK : boolean;
    let data;

    this.http.post(serverUrl, body).subscribe(
      (response: Response) => {
        OK = response.ok;
        data = response.json();
      },
      (err) => {OK = false},
      () => {}
    );

    if (OK) {
      this.storage.saveUserFromLogIn(this.buildUser(data.data));
      return true;
    }
    return false;
  }

  public signUpSupervisor(username: string, password: string, email: string) : Observable<Response> {
    let serverUrl : string = `${this.serverConfig.secure ? 'https://' : 'http://'}${this.serverConfig.host}:${this.serverConfig.port}${this.REGISTER_USER_DIRECTION}`;
    let body = {username, password, email};

    return this.http.post(serverUrl, body);
  }

  //TODO: Finish
  public updateUser(email: string, newPassword: string) : boolean {
    let serverUrl : string = `${this.serverConfig.secure ? 'https://' : 'http://'}${this.serverConfig.host}:${this.serverConfig.port}${this.UPDATE_USER_DIRECTION}`;
    let body = {email, newPassword};
    let OK : boolean;
    let data;

    this.http.put(serverUrl, body).subscribe(
      (transactionOK : Response) => {OK = true; data = transactionOK.json()},
      (err) => {OK = false},
      () => {}
    );

    if (OK) {
      let newUser = this.buildUser(data.data);
      this.storage.saveUserFromLogIn(newUser);
    }

    return OK;
  }


  /** Utility */

  public buildUser(data : any) : User {
    console.log(data);
    let userData = data;
    let user = new User();
    user.name = userData.name;
    user.surnames = userData.surnames;
    user.dni = userData.dni;
    user.email = userData.email;
    user.id = userData.id;
    user.role = userData.role;
    user.username = userData.username;

    console.log(user);
    return user;
  }
}
