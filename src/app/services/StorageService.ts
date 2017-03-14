import {User} from "../models/User";
import {ApplicationState} from "../redux/store/AppStore";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {ApplicationActions} from "../redux/actions/ApplicationActions";


@Injectable()
export class StorageService {
  //FIXME: Complete
  constructor(private store: Store<ApplicationState>) {

  }

  public saveUserFromLogIn(user: User) : void {
    this.store.dispatch(ApplicationActions.logIn(user));
  }

  public getLoggedUser() : User {
    let actualState;
    this.store.subscribe((state: ApplicationState) => actualState = state);
    return actualState.user;
  }
}
