import {Http, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {StorageService} from "./StorageService";
import {User} from "../models/User";
import {ServerConfig} from "../config/Server.config";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  private serverConfig : ServerConfig;
  //FIXME: Include real directions
  private REGISTER_USER_DIRECTION = '/api-v1/signup/supervisor';
  private LOGIN_USER_DIRECTION = '/api-v1/login';
  private UPDATE_USER_DIRECTION ='';
  private RETRIEVE_USER_DATA_DIRECTION = '/api-v1/users/profile';


  public constructor(private http: Http, private storage: StorageService) {
    this.serverConfig = this.storage.getServerConfig();
  }


  /** Actions */

  public doLogin(email: string, password: string) : Observable<Response> {
    let serverUrl : string = `${this.serverConfig.secure ? 'https://' : 'http://'}${this.serverConfig.host}:${this.serverConfig.port}${this.LOGIN_USER_DIRECTION}`;
    let body = {email, password};

    return this.http.post(serverUrl, body);
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

  public retrieveUser(token: string) : Observable<Response> {
    let serverUrl : string = `${this.serverConfig.secure ? 'https://' : 'http://'}${this.serverConfig.host}:${this.serverConfig.port}${this.RETRIEVE_USER_DATA_DIRECTION}`;
    let jwtToken = `JWT ${token}`;
    let headers: Headers = new Headers({
      'Authorization': jwtToken
    });

    return this.http.get(serverUrl, {headers: headers});
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
