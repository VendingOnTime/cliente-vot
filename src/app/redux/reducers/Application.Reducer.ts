import {UserReducer} from "./User.reducer";
import {ServerConfigReducer} from "./ServerConfig.reducer";
import {LanguageReducer} from "./Language.reducer";


export const rootReducer = {userReducer: UserReducer, serverConfigReducer: ServerConfigReducer, languageReducer: LanguageReducer};
