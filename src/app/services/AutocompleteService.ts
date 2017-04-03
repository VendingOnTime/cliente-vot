import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {User} from "../models/User";


@Injectable()
export class AutocompleteService {

  constructor(private http: Http) {

  }


  public getAvailableTechnicians(loggedUser : User) : {} {
    //FIXME: Mock method
    //TODO: Write the http method
    //let serverUrl = '';
    //this.http.get(serverUrl).subscribe(
    //  (results : Response) => {},
    //  (err) => {},
    //  () => {}
    //);
    return {"0":"Burriana","1":"Bartolomeo"};
  }

  //TODO: Complete methods

}
