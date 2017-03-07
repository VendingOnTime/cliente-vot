import {UsernameValidator} from "../../src/app/validators/UsernameValidator";
import {FormControl} from "@angular/forms";

describe('A username in the system', function () {

  it('should be a string', function () {
    expect(UsernameValidator(new FormControl(123))["error"]).toBe(true);
  });

});
