"use strict";
exports.__esModule = true;
var UsernameValidator_1 = require("../../src/app/validators/UsernameValidator");
var forms_1 = require("@angular/forms");
describe('A username in the system', function () {
    it('should be a string', function () {
        expect(UsernameValidator_1.UsernameValidator(new forms_1.FormControl(123))["error"]).toBe(true);
    });
});
