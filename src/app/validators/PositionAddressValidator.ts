import {AbstractControl} from "@angular/forms";

export function PositionAddressValidator(control: AbstractControl) : {[key: string] : boolean} {

  let position: string = control.value;

  var REGEXP =  /^[a-zA-Z0-9.,?¿!¡_-ñÑçÇáàéèíìóòúùüï]+$/i;

  if (position != null && position != "" && position.length > 140) {
    return { "incorrectPositionLength": true };
  }
  if (position != null && position != "" && !REGEXP.test(position)) {
    return { "incorrectPositionFormat": true };
  }

  if (position != null && position != "" && position.length < 2 )  {
    return { "incorrectDescriptionMinLength": true };
  }

  return null;
}
