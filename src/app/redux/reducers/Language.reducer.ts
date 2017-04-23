import {Languages} from "../../config/locales/Languages";
import {Action} from "@ngrx/store";
import {ApplicationActions} from "../actions/ApplicationActions";

const INITIAL_STATE = Languages.ES;

export function LanguageReducer(state = INITIAL_STATE, action : Action) {

  switch (action.type) {

    case ApplicationActions.CONFIGURE_LANGUAGE:
      return action.payload;

    default:
      return state;

  }

}
