import { combineReducers } from "redux";
import themeReducer from "../features/theme/themeSlice.ts";
import loginReducer from "../features/login/loginSlice.ts";

const rootReducer = combineReducers({
  theme: themeReducer,
  login: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
