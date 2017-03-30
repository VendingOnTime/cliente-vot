import {User} from "../../models/User";
import {Action} from "ngrx/@ngrx/store";
import {ApplicationActions} from "../actions/ApplicationActions";


export interface UserReducerState {
  logged: boolean,
  user: User,
}

const INITIAL_STATE = {
  logged: false,
  user: null
};

export const UserReducer = (state: UserReducerState = INITIAL_STATE, action: Action) : UserReducerState => {

  switch (action.type) {
    case ApplicationActions.LOG_IN:
      return {logged: true, user: action.payload};

    default:
      return state;
  }
};
