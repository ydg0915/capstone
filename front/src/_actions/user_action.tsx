import axios from "axios";
import {
  HIDE_ERROR_MESSAGE,
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOGIN_STATUS,
  SHOW_ERROR_MESSAGE,
} from "./types";

export const loginUser = (formData) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/users/login",
        data: formData,
      }).then(async (res) => {
        console.log(res);
        const data = res.data.data;
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        await axios
          .get("http://localhost:8080/api/v1/users/me", config)
          .then((res) => {
            const user = res.data.data;
            console.log(user);
            localStorage.setItem("user", JSON.stringify(user));
          });
        dispatch({
          type: LOGIN_USER,
          payload: true,
        });
      });
    } catch (error: any) {
      console.log(error);
      dispatch(showErrorMessage(error.response.data.message.split(",")[0]));
      dispatch({
        type: LOGIN_USER,
        payload: false,
      });
    }
  };
};

export const logoutUser = (accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  axios({
    method: "post",
    url: "http://localhost:8080/api/v1/users/logout",
    data: null,
    headers: config.headers,
  }).catch((error) => {
    console.log(error);
  });

  return {
    type: LOGOUT_USER,
    payload: false,
  };
};

export const setLoginStatus = (status) => {
  return {
    type: SET_LOGIN_STATUS,
    payload: status,
  };
};

export const showErrorMessage = (message) => {
  return {
    type: SHOW_ERROR_MESSAGE,
    payload: message,
  };
};

export const hideErrorMessage = () => {
  return {
    type: HIDE_ERROR_MESSAGE,
  };
};
