import {AbstractControl} from "@angular/forms";

export function DniValidator(control: AbstractControl) : {[key: string] : boolean} {

  let dni: string = control.value;

  const DNI_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

  if (dni != "" && (dni.length <= 5 || dni.length > 20  || !DNI_REGEXP.test(dni))) {
    return { "incorrectDniFormat": true };
  }

  return null;
}
