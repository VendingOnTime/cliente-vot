import {AbstractControl} from "@angular/forms";

export function DescriptionValidator(control: AbstractControl) : {[key: string] : boolean} {

  let description: string = control.value;

  let REGEXP = /^[a-zA-Z0-9.,?¿!¡_-ñÑçÇáàéèíìóòúùüï]+$/i;

  if (description != null && description != "" && description.length > 300 )  {
    return { "incorrectDescriptionLength": true };
  }

  if (description != null && description != "" &&  !REGEXP.test(description))  {
    return { "incorrectDescriptionFormat": true };
  }

  return null;
}
