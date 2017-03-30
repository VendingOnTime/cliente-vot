import {combineReducers} from "ngrx/@ngrx/store";
import {UserReducer} from "./User.reducer";


export const rootReducer = combineReducers({userReducer: UserReducer});
