import {FormControl, FormGroup} from "@angular/forms";
import {UsernameValidator} from "./UsernameValidator";

describe('A email in the system', function () {

  let maxLength = "aaaaaoooooeeeeeuuuuu";
  let minLength = "aaaa";
  let valid = "MEDERUEVA";
  let invalid = "1MEMEME";

  it('email should start with letter', function () {
    let user = new FormControl(valid);

    expect(UsernameValidator(user)).toBe(null)
  });

  it('email shouldn\'t start with a number', function () {
    let user = new FormControl(invalid);

    expect(UsernameValidator(user)["format_username"]).toBe(true)
  });

  it('email can equal 4' , () => {
    let user = new FormControl(minLength);

    expect(UsernameValidator(user)).toBe(null)
  });

  it('email should more large than 4' , () => {
    let user = new FormControl(minLength.slice(0,minLength.length - 1));

    expect(UsernameValidator(user)["short_username"]).toBe(true)
  });

  it('email can equal 20' , () => {
    let user = new FormControl(maxLength);

    expect(UsernameValidator(user)).toBe(null)
  });

  it('email shouldn\'t more large than 20' , () => {
    let user = new FormControl(maxLength.concat("a"));

    expect(UsernameValidator(user)["large_username"]).toBe(true)
  });

  // TODO: Falta mejorar el caso de simbolos extraños
  it('email should contains numbers, letters, - and _' , () => {
    let user = new FormControl(valid.concat("1234\""));

    expect(UsernameValidator(user)["format_username"]).toBe(true)
  });
});
