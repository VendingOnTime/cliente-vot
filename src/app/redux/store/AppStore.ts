import {User} from "../../models/User";

export interface ApplicationState {
  logged: boolean,
  user: User,
}

export const INITIAL_STATE : ApplicationState = {logged: false, user: null};
