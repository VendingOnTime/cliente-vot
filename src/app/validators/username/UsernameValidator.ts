import {AbstractControl} from "@angular/forms";

export function UsernameValidator(control: AbstractControl) : {[key: string] : boolean} {

  let username: string = control.value;

  if (username.length < 4 && username.length > 0)
    return {"short_username": true, "large_username": false};

  if (username.length > 20)
    return {"short_username": false, "large_username": true};

  var USERNAME_REGEXP = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;

  if (username != "" && !USERNAME_REGEXP.test(username)) {
    return { "format_username": true };
  }

  return null;
}
