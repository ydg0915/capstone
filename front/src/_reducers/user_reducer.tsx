import { LOGIN_USER, LOGOUT_USER, SET_LOGIN_STATUS } from "../_actions/types";

interface UserState {
  isLogin: boolean;
}

const initialState: UserState = {
  isLogin: false,
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLogin: action.paylaod };

    case LOGOUT_USER:
      return { ...state, isLogin: action.paylaod };

    case SET_LOGIN_STATUS:
      return { ...state, isLogin: action.payload };

    default:
      return state;
  }
};
export default userReducer;
