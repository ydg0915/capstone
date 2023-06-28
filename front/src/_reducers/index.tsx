import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import errorReducer from "./error_reducer";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  userReducer,
  errorReducer,
});

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    (typeof window !== 'undefined' && window.navigator.userAgent.includes('Chrome')
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      : compose
    )
  )
);


export default rootReducer;
export type RootState = ReturnType<typeof store.getState>;