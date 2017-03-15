"use strict";
exports.__esModule = true;
var RepeatPasswordValidator_1 = require("../../src/app/validators/RepeatPasswordValidator");
var forms_1 = require("@angular/forms");
describe('A password validation in the system', function () {
    it('should fail with passwords that are not equal', function () {
        var passwords = new forms_1.FormGroup({ password: new forms_1.FormControl('password1'), repeatPassword: new forms_1.FormControl('password2') });
        expect(RepeatPasswordValidator_1.RepeatPasswordValidator(passwords)).not.toBe(null);
    });
    it('should pass with two identical passwords', function () {
        var passwords = new forms_1.FormGroup({ password: new forms_1.FormControl('password1'), repeatPassword: new forms_1.FormControl('password1') });
        expect(RepeatPasswordValidator_1.RepeatPasswordValidator(passwords)).toBe(null);
    });
});
