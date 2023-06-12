import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import errorReducer from "./error_reducer";

const rootReducer = combineReducers({
  userReducer,
  errorReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
