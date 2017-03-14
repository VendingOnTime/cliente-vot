import {Action} from "@ngrx/store";
import {User} from "../../models/User";
import {Injectable} from "@angular/core";


@Injectable()
export class ApplicationActions {

  public static LOG_IN = "LOG_IN";
  public static logIn(user: User) : Action {
    return {type: ApplicationActions.LOG_IN, payload: user};
  }

}
