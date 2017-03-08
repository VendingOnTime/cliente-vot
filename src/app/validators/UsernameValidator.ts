import {AbstractControl} from "@angular/forms";

export function UsernameValidator(control: AbstractControl) : {[key: string] : boolean} {

  let username: string = control.value;

  if (username.length < 4 && username.length > 0)
    return {"short_username": true, "large_username": false};

  if (username.length > 20)
    return {"short_username": false, "large_username": true};

  return null;
}
