import {User} from "../../models/User";

export interface ApplicationState {
  logged: boolean,
  user: User,
}

export const INITIAL_STATE = {logged: false, user: null};

