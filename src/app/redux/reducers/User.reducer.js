"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationActions_1 = require("../actions/ApplicationActions");
var INITIAL_STATE = {
    logged: false,
    user: null,
    token: null
};
function UserReducer(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case ApplicationActions_1.ApplicationActions.LOG_IN_USER:
            return { logged: true, user: action.payload, token: state.token };
        case ApplicationActions_1.ApplicationActions.LOG_IN_TOKEN:
            return { logged: true, user: state.user, token: action.payload };
        default:
            return state;
    }
}
exports.UserReducer = UserReducer;
