import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOGIN_STATUS,
  SET_PROJECTS,
} from "../_actions/types";

interface UserState {
  isLogin: boolean;
  projects: [];
}

const initialState: UserState = {
  isLogin: false,
  projects: [],
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLogin: action.payload };

    case LOGOUT_USER:
      return { ...state, isLogin: action.payload };

    case SET_LOGIN_STATUS:
      return { ...state, isLogin: action.payload };

    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };

    default:
      return state;
  }
};
export default userReducer;
