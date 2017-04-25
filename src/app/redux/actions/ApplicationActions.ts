import {Action} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {ServerConfig} from "../../config/Server.config";
import {Languages} from "../../config/locales/Languages";
import {User} from "../../models/User";


@Injectable()
export class ApplicationActions {

  public static LOG_IN_USER = "LOG_IN_USER";
  public static saveLogInUser(user: User) : Action {
    return {type: ApplicationActions.LOG_IN_USER, payload: user};
  }

  public static LOG_IN_TOKEN = "LOG_IN_TOKEN";
  public static saveLogInToken(token: String) : Action {
    return {type: ApplicationActions.LOG_IN_TOKEN, payload: token};
  }

  public static CONFIGURE_SERVER_DATA = "CONFIGURE_SERVER_DATA";
  public static configureServerData(config: ServerConfig) : Action {
    return {type: ApplicationActions.CONFIGURE_SERVER_DATA, payload: config};
  }

  public static CONFIGURE_LANGUAGE = "CONFIGURE_LANGUAGE";
  public static configureLanguage(config: Languages) : Action {
    return {type: ApplicationActions.CONFIGURE_LANGUAGE, payload: config};
  }
}
