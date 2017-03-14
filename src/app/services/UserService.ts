import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {StorageService} from "./StorageService";
import {User} from "../models/User";

@Injectable()
export class UserService {

  public constructor(private http: Http, private storage: StorageService) { }


  public doLogin(username: string, password: string) : boolean {
    let loginOK = true;
    //TODO: Do HTTP request to the server to do the login
    if (loginOK) {
      this.storage.saveUserFromLogIn(this.buildUser());
      return true;
    }
    return false;
  }

  private buildUser() : User {
    //FIXME: Complete
    return new User();
  }

  public registerUser(username: string, password: string, email: string) : boolean {
    //TODO: Do HTTP request to the server to register a new user
    return false;
  }


}
