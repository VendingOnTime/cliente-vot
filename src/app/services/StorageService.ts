import {User} from "../models/User";
import {ApplicationState} from "../redux/store/AppStore";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {ApplicationActions} from "../redux/actions/ApplicationActions";
import {Observable} from "rxjs";


@Injectable()
export class StorageService {
  //FIXME: Complete
  constructor(private store: Store<ApplicationState>) {

  }

  public saveUserFromLogIn(user: User) : void {
    this.store.dispatch(ApplicationActions.logIn(user));
  }

  public getLoggedUser() : Observable<User> {
    return this.store.select('user');
  }
}
