import {Action} from "ngrx/@ngrx/store";


export class ApplicationActions {

  public static LOG_IN = "LOG_IN";
  public static logIn() : Action {
    return {type: ApplicationActions.LOG_IN};
  }

}
