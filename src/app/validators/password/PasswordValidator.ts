import {AbstractControl} from "@angular/forms";

export function PasswordValidator(control: AbstractControl) : {[key: string] : boolean} {

  let password: string = control.value;

  var PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

  if (password != "" && (password.length <= 5 || password.length > 20  || !PASSWORD_REGEXP.test(password))) {
    return { "incorrectPasswordFormat": true };
  }

  return null;
}
