import {Action} from "ngrx/@ngrx/store";
import {User} from "../../models/User";


export class ApplicationActions {

  public static LOG_IN = "LOG_IN";
  public static logIn(user: User) : Action {
    return {type: ApplicationActions.LOG_IN, payload: user};
  }

}
