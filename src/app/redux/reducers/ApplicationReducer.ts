import {ActionReducer, Action} from "@ngrx/store";
import {ApplicationState, INITIAL_STATE} from "../store/AppStore";
import {ApplicationActions} from "../actions/ApplicationActions";


export function ApplicationReducer(state, action: Action) : ApplicationState {

  switch (action.type) {

    case ApplicationActions.LOG_IN:
      //TODO: Manage state
      return state;

    default:
      return state;
  }

};
