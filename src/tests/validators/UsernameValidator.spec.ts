import {FormControl} from "@angular/forms";
import {UsernameValidator} from "../../app/validators/UsernameValidator";

describe('A username in the system', function () {

  it('should be a string', function () {
    expect(UsernameValidator(new FormControl(123))["error"]).toBe(true);
  });

});
