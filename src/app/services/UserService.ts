import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class UserService {

  public constructor(public http: Http) { }


  public doLogin(username: string, password: string) : boolean {
    //TODO: Do HTTP request to the server to do the login
    return false;
  }

  public registerUser(username: string, password: string, email: string) : boolean {
    //TODO: Do HTTP request to the server to register a new user
    return false;
  }


}
