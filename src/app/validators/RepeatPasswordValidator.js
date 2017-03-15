"use strict";
exports.__esModule = true;
function RepeatPasswordValidator(group) {
    var pass = group.controls['password'].value;
    var repPass = group.controls['repeatPassword'].value;
    if (pass !== repPass) {
        return { areEqual: true };
    }
    return null;
}
exports.RepeatPasswordValidator = RepeatPasswordValidator;
