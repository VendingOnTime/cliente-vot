import {FormGroup, FormControl} from "@angular/forms";
import {RepeatPasswordValidator} from "./RepeatPasswordValidator";

describe('A password validation in the system', function () {

  it('should fail with passwords that are not equal',  () => {
    let passwords = new FormGroup({password: new FormControl('password1'), repeatPassword: new FormControl('password2')});

    expect(RepeatPasswordValidator(passwords)).not.toBe(null);
  });

  it('should pass with two identical passwords', function () {
    let passwords = new FormGroup({password: new FormControl('password1'), repeatPassword: new FormControl('password1')});

    expect(RepeatPasswordValidator(passwords)).toBe(null);
  });

});
