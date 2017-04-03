import {ServerConfig, DEV_CONFIG} from "../../environment/Server.config";
import {Action} from "ngrx/@ngrx/store";
import {ApplicationActions} from "../actions/ApplicationActions";

const INITIAL_STATE = DEV_CONFIG;

export function ServerConfigReducer(state: ServerConfig = INITIAL_STATE, action: Action) {

  switch (action.type) {

    case ApplicationActions.CONFIGURE_SERVER_DATA:
      return action.payload;

    default:
      return state;

  }
}
