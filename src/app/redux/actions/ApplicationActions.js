"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ApplicationActions = ApplicationActions_1 = (function () {
    function ApplicationActions() {
    }
    ApplicationActions.saveLogInUser = function (user) {
        return { type: ApplicationActions_1.LOG_IN_USER, payload: user };
    };
    ApplicationActions.saveLogInToken = function (token) {
        return { type: ApplicationActions_1.LOG_IN_TOKEN, payload: token };
    };
    ApplicationActions.configureServerData = function (config) {
        return { type: ApplicationActions_1.CONFIGURE_SERVER_DATA, payload: config };
    };
    ApplicationActions.configureLanguage = function (config) {
        return { type: ApplicationActions_1.CONFIGURE_LANGUAGE, payload: config };
    };
    return ApplicationActions;
}());
ApplicationActions.LOG_IN_USER = "LOG_IN_USER";
ApplicationActions.LOG_IN_TOKEN = "LOG_IN_TOKEN";
ApplicationActions.CONFIGURE_SERVER_DATA = "CONFIGURE_SERVER_DATA";
ApplicationActions.CONFIGURE_LANGUAGE = "CONFIGURE_LANGUAGE";
ApplicationActions = ApplicationActions_1 = __decorate([
    core_1.Injectable()
], ApplicationActions);
exports.ApplicationActions = ApplicationActions;
var ApplicationActions_1;
