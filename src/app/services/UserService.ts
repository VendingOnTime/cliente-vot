import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class UserService {

  public constructor(public http: Http) { }


  public doLogin(username: string, password: string) {
    //TODO: Do HTTP request to the server to do the login
  }

  public registerUser(username: string, password: string, email: string) {
    //TODO: Do HTTP request to the server to register a new user
  }


}
