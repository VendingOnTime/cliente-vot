import {Injectable} from "@angular/core";
import {
  CanActivate, CanLoad, CanActivateChild, Router, RouterStateSnapshot,
  ActivatedRouteSnapshot, Route, NavigationExtras
} from "@angular/router";
import {StorageService} from "../services/StorageService";
import {UserReducerState} from "../redux/reducers/User.reducer";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) {}


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let result : boolean;

    if (localStorage.getItem('token'))
      result = true;

    else {
      this.router.navigate(['/login']);
      result = false;
    }

    return result;
  }
}
