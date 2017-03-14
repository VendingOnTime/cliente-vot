import {Action} from "@ngrx/store";
import {INITIAL_STATE} from "../store/AppStore";
import {ApplicationActions} from "../actions/ApplicationActions";


export function ApplicationReducer(state = INITIAL_STATE, action: Action) {

  switch (action.type) {

    case ApplicationActions.LOG_IN:
      //TODO: Manage state
      return state;

    default:
      return state;
  }

};
