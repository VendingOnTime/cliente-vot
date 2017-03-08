import {AbstractControl} from "@angular/forms";

export function EmailValidator(control: AbstractControl) : {[key: string] : boolean} {

  let email: string = control.value;

  var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  if (email != "" && (email.length <= 5 || !EMAIL_REGEXP.test(email))) {
    return { "incorrectMailFormat": true };
  }

  return null;
}
