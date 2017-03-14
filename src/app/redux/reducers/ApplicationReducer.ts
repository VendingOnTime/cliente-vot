import {Action} from "@ngrx/store";
import {INITIAL_STATE, ApplicationState} from "../store/AppStore";
import {ApplicationActions} from "../actions/ApplicationActions";


export function ApplicationReducer(state = INITIAL_STATE, action: Action) : ApplicationState {

  switch (action.type) {

    case ApplicationActions.LOG_IN:
      if (action.payload != null)
        return {logged: true, user: action.payload};
      return state;

    default:
      return state;
  }

};
