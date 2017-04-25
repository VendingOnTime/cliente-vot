import {User} from "../models/User";
import {ApplicationState} from "../redux/store/AppStore";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {ApplicationActions} from "../redux/actions/ApplicationActions";
import {Observable} from "rxjs";
import {UserReducerState} from "../redux/reducers/User.reducer";
import {ServerConfig} from "../config/Server.config";
import {Languages} from "../config/locales/Languages";


@Injectable()
export class StorageService {
  //FIXME: Complete
  constructor(private store: Store<ApplicationState>) { }


  public saveUserFromLogIn(user: User) : void {
    this.store.dispatch(ApplicationActions.saveLogInUser(user));
  }

  public saveTokenFromLogIn(token: String) : void {
    this.store.dispatch(ApplicationActions.saveLogInToken(token));
  }

  public getUserReducer() : Observable<UserReducerState> {
    return this.store.select('userReducer');
  }

  public getLoggedUser() : User {
    let loggedUser : User;
    this.getUserReducer().subscribe((userReducer : UserReducerState) => {loggedUser = userReducer.user});
    return loggedUser;
  }

  public getServerConfig() : ServerConfig {
    let serverConfig : ServerConfig;
    this.store.select('serverConfigReducer').subscribe((config: ServerConfig) => {serverConfig = config});
    return serverConfig;
  }

  public setServerConfig(config: ServerConfig) : void {
    this.store.dispatch(ApplicationActions.configureServerData(config));
  }

  public getStore() : Store<ApplicationState> {
    return this.store;
  }

  public getLanguage() : Languages {
    let language : Languages;
    this.store.select('languageReducer').subscribe((config: Languages) => {language = config});
    return language;
  }
}
