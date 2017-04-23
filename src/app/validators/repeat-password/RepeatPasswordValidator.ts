import {FormGroup} from "@angular/forms";

export function RepeatPasswordValidator (group: FormGroup) : {[key: string] : boolean} {
  let pass = group.controls['password'].value;
  let repPass = group.controls['repeatPassword'].value;

  if (pass !== repPass) {
    return {areEqual: true};
  }
  return null;
}
