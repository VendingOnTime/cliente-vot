import {AbstractControl} from "@angular/forms";

export function UsernameValidator(control: AbstractControl) : {[key: string] : boolean} {

  let username: string = control.value;

  if (username == null || username.length < 8 || username.length > 20)
    return {"error": true};

  return null;
}
