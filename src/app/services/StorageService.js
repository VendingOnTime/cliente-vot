"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ApplicationActions_1 = require("../redux/actions/ApplicationActions");
var StorageService = (function () {
    //FIXME: Complete
    function StorageService(store) {
        this.store = store;
    }
    StorageService.prototype.saveUserFromLogIn = function (user) {
        this.store.dispatch(ApplicationActions_1.ApplicationActions.saveLogInUser(user));
    };
    StorageService.prototype.saveTokenFromLogIn = function (token) {
        this.store.dispatch(ApplicationActions_1.ApplicationActions.saveLogInToken(token));
    };
    StorageService.prototype.getUserReducer = function () {
        return this.store.select('userReducer');
    };
    StorageService.prototype.getLoggedUser = function () {
        var loggedUser;
        this.getUserReducer().subscribe(function (userReducer) { loggedUser = userReducer.user; });
        return loggedUser;
    };
    StorageService.prototype.getServerConfig = function () {
        var serverConfig;
        this.store.select('serverConfigReducer').subscribe(function (config) { serverConfig = config; });
        return serverConfig;
    };
    StorageService.prototype.setServerConfig = function (config) {
        this.store.dispatch(ApplicationActions_1.ApplicationActions.configureServerData(config));
    };
    StorageService.prototype.getStore = function () {
        return this.store;
    };
    StorageService.prototype.getLanguage = function () {
        var language;
        this.store.select('languageReducer').subscribe(function (config) { language = config; });
        return language;
    };
    return StorageService;
}());
StorageService = __decorate([
    core_1.Injectable()
], StorageService);
exports.StorageService = StorageService;
