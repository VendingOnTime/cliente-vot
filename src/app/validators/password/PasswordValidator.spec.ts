import {FormControl, FormGroup} from "@angular/forms";
import {PasswordValidator} from "./PasswordValidator";

describe('A password in the system', function () {

  let maxValid = "123456789012345678Ll";
  let noNumber = "aoeuiIUEOA";
  let noLowerLetter = "1234IUEOA";
  let noUpperLetter = "aoeui1234";
  let minValid ="a1Añpf";

  it('email should have a number', function () {
    let user = new FormControl(noNumber);

    expect(PasswordValidator(user)["incorrectPasswordFormat"]).toBe(true)
  });

  it('email should have a upper letter', function () {
    let user = new FormControl(noUpperLetter);

    expect(PasswordValidator(user)["incorrectPasswordFormat"]).toBe(true)
  });

  it('email should have a lower letter', function () {
    let user = new FormControl(noLowerLetter);

    expect(PasswordValidator(user)["incorrectPasswordFormat"]).toBe(true)
  });

  it('email should can to have 6', function () {
    let user = new FormControl(minValid);

    expect(PasswordValidator(user)).toBe(null)
  });

  it('email should more longer than 5', function () {
    let user = new FormControl(minValid.slice(0,minValid.length - 1));

    expect(PasswordValidator(user)["incorrectPasswordFormat"]).toBe(true)
  });

  it('email should can to have 20', function () {
    let user = new FormControl(maxValid);

    expect(PasswordValidator(user)).toBe(null)
  });

  it('email shouldn\'t more longer than 20', function () {
    let user = new FormControl(maxValid.concat("h"));

    expect(PasswordValidator(user)["incorrectPasswordFormat"]).toBe(true)
  });
});
