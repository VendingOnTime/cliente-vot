import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {User} from "../../models/User";
import {StorageService} from "../../services/StorageService";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserReducerState} from "../../redux/reducers/User.reducer";
import {LocalesService} from "../../services/LocalesService";
import {UpdateUserComponent} from "../update-user/update-user.component";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";
import {overlayConfigFactory, Modal, ModalComponent, Overlay} from "angular2-modal";


@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  providers : [Overlay]
})
export class NavigationBarComponent {

  public isCollapsed: boolean = false;
  public userReducerState: Observable<UserReducerState> = this.storage.getUserReducer();

  public constructor(
    public storage: StorageService,
    private router: Router,
    public localesService: LocalesService,
    public vcRef: ViewContainerRef,
    public modal: Modal,
    public overlay: Overlay
  ) {
    this.storage.getStore().subscribe( state => console.log('Initial App State: ', state));
    this.modal.overlay = overlay;
    this.modal.overlay.defaultViewContainer = vcRef;
  }


  /** Router methods */

  public goToRegister() {
    this.router.navigate(['signup']);
  }

  public goToLogin() {
    this.router.navigate(['login']);
  }

  //TODO: Finish dropdown button
  public goToProfile() {

  }

  public goToAdminSection() {
    this.router.navigate(['admin']);
  }

  public goToIssuesPanel() {
    this.router.navigate(['issues']);
  }

  public goToTechniciansPanel() {
    this.router.navigate(['technicians']);
  }

  public goToMachinesPanel() {
    this.router.navigate(['machines']);
  }

  public getUser() : Observable<User> {
    return this.userReducerState.map((data: UserReducerState) => data.user);
  }

  public getLoggedUsername() : Observable<string> {
    return this.getUser().map((user : User) => user.username);
  }

  public getLogged() : boolean {
    if (localStorage.getItem('token') && this.validWebToken(localStorage.getItem('token')))
     return true;

    else
      return false;
  }

  private validWebToken(token: string) {
    //FIXME: validate token
    return true;
  }

  public logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    }
  }

  public userData() {
    this.modal.open(UpdateUserComponent, overlayConfigFactory({ isBlocking: false }, BSModalContext));
  }
}
