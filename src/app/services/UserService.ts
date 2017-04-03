import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {StorageService} from "./StorageService";
import {User} from "../models/User";
import {ServerConfig} from "../environment/Server.config";

@Injectable()
export class UserService {

  private serverConfig : ServerConfig;
  //FIXME: Include real directions
  private REGISTER_USER_DIRECTION = '/api-v1/signup/supervisor';
  private LOGIN_USER_DIRECTION = '';
  private UPDATE_USER_DIRECTION ='';


  public constructor(private http: Http, private storage: StorageService) {
    this.serverConfig = this.storage.getServerConfig();
  }


  /** Actions */

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
      this.storage.saveUserFromLogIn(this.buildUser(data));
      return true;
    }
    return false;
  }

  public registerUser(username: string, password: string, email: string) : boolean {
    let serverUrl : string = `${this.serverConfig.secure ? 'https://' : 'http://'}${this.serverConfig.host}:${this.serverConfig.port}${this.REGISTER_USER_DIRECTION}`;
    let body = {username, password, email};
    let OK : boolean;

    this.http.post(serverUrl, body).subscribe(
      (userOK : Response) => {OK = true},
      (err) => {OK = false},
      () => {}
    );

    return OK;
  }

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
      let newUser = this.buildUser(data);
      this.storage.saveUserFromLogIn(newUser);
    }

    return OK;
  }


  /** Utility */

  //FIXME: Build real user
  private buildUser(data : any) : User {
    let user = new User();
    user.name = "Prueba";
    return user;
  }
}
