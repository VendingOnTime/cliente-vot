import {Action} from "@ngrx/store";
import {ApplicationActions} from "../actions/ApplicationActions";
import {User} from "../../models/User";


export interface UserReducerState {
  logged: boolean,
  user: User,
  token: string
}

const INITIAL_STATE = {
  logged: false,
  user: null,
  token: null
};

export function UserReducer(state: UserReducerState = INITIAL_STATE, action: Action) : UserReducerState {

  switch (action.type) {
    case ApplicationActions.LOG_IN_USER:
      return {logged: true, user: action.payload, token: state.token};

    case ApplicationActions.LOG_IN_TOKEN:
      return {logged: true, user: state.user, token: action.payload};

    default:
      return state;
  }
}
