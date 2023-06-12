import {
  LOGIN_USER,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  SET_LOGIN_STATUS,
} from "../_actions/types";

interface UserState {
  isLogin: boolean;
  isFetching: boolean;
}

const initialState: UserState = {
  isLogin: false,
  isFetching: false,
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, isFetching: true };

    case LOGIN_USER:
      return { ...state, isLogin: true };

    case LOGOUT_USER:
      return { ...state, isLogin: false };

    case SET_LOGIN_STATUS:
      return { ...state, isLogin: action.payload };

    default:
      return state;
  }
};
export default userReducer;
