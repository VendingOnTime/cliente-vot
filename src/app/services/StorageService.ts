import {User} from "../models/User";
import {ApplicationState} from "../redux/store/AppStore";
import {Store} from "ngrx/@ngrx/store";
import {ApplicationActions} from "../redux/actions/ApplicationActions";
import {Injectable} from "@angular/core";


@Injectable()
export class StorageService {
  //FIXME: Complete
  constructor(private store: Store<ApplicationState>) {

  }

  public saveUserFromLogIn(user: User) : void {
    this.store.dispatch(ApplicationActions.logIn(user));
  }
}
