import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {StorageService} from "./StorageService";
import {User} from "../models/User";

@Injectable()
export class UserService {

  public constructor(private http: Http, private storage: StorageService) { }

  private registerUserRoute = '';
  private loginUserRoute = '';

  public doLogin(username: string, password: string) : boolean {
    let loginOK = true;
    let data = {};

    this.http.post(this.loginUserRoute, {username, password})
      .map((response: Response) => {
        loginOK = response.ok;
        data = response.json();
      });

    if (loginOK) {
      this.storage.saveUserFromLogIn(this.buildUser(data));
      return true;
    }
    return false;
  }

  private buildUser(data : any) : User {
    let user = new User();
    user.name = "Prueba";
    return user;
  }

  public registerUser(username: string, password: string, email: string) : boolean {
    let waitingToServer = true;
    let data = {username, password, email};
    let correctRegistering = false;

    this.http.post(this.registerUserRoute, data).map((userOK : Response) => {
      waitingToServer = false;
      correctRegistering = userOK.ok;
    });
    return correctRegistering;
  }

  public updateUser(email: string, newPassword: string) : boolean {
    //FIXME: Complete
    return false;
  }
}
