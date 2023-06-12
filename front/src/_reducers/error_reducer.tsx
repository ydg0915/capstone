import { SHOW_ERROR_MESSAGE, HIDE_ERROR_MESSAGE } from "../_actions/types";

const initialState = {
  errorMessage: "",
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case HIDE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default errorReducer;
