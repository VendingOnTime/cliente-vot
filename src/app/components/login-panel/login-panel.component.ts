import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {UserService} from "../../services/UserService";
import {Router} from "@angular/router";
import {LocalesService} from "../../services/LocalesService";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {StorageService} from "../../services/StorageService";


@Component({
  selector: 'login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent {

  // Elements
  private form : FormGroup;
  private userInput: AbstractControl;
  private passwordInput: AbstractControl;

  // Model binding
  private user: string = '';
  private password: string = '';

  // Management
  private loginError: boolean = false;


  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router,
    public localesService: LocalesService,
    public storageService: StorageService
  ) {

    this.form = this.formBuilder.group({
      user: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });

    this.userInput = this.form.controls['user'];
    this.passwordInput = this.form.controls['password'];
  }


  /** Actions */

  public onSubmitLogin() : void {
    if (this.form.valid) {
      let introducedUsername = this.userInput.value;
      let introducedPassword = this.passwordInput.value;

      this.manageLogin(this.userService.doLogin(introducedUsername, introducedPassword));
    }
  }

  private manageLogin(result: Observable<Response>) {

    let success : boolean = false;

    result.subscribe(
      (response: Response) => {
        if (response.ok) {
          let data = response.json();
          success = data.success;

          if (success) {
            this.storageService.saveTokenFromLogIn(data.data);

            this.userService.retrieveUser(data.data).subscribe(
              (userData: Response) => {
                console.log(userData);
                if (userData.ok) {
                  let responseData = userData.json();

                  console.log(responseData);

                  if (responseData.success)
                    this.storageService.saveUserFromLogIn(this.userService.buildUser(responseData.data));
                  else
                    this.loginError = true;
                }
                else
                  this.loginError = true;
              },
              //TODO: Manage error messages
              (err) => {},
              () => {}
            );
          }
          else
            this.loginError = true;
        }
        else
          this.loginError = true;
      },
      //TODO: Manage error messages
      (err) => {
        this.loginError = true;
      },
      () => {
        if (success && !this.loginError)
          this.router.navigate(['/home']);
      }
    );
  }
}
