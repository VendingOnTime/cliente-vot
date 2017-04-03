import {Action} from "@ngrx/store";
import {User} from "../../models/User";
import {Injectable} from "@angular/core";
import {ServerConfig} from "../../environment/Server.config";


@Injectable()
export class ApplicationActions {

  public static LOG_IN = "LOG_IN";
  public static logIn(user: User) : Action {
    return {type: ApplicationActions.LOG_IN, payload: user};
  }

  public static CONFIGURE_SERVER_DATA = "CONFIGURE_SERVER_DATA";
  public static configureServerData(config: ServerConfig) : Action {
    return {type: ApplicationActions.CONFIGURE_SERVER_DATA, payload: config};
  }
}
