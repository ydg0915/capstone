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
            localStorage.setItem("user", JSON.stringify(user));
          });

        const eventSource = new EventSource(
          "http://localhost:8080/api/v1/notifications/subscribe"
        );
        console.log(eventSource);
        dispatch({
          type: LOGIN_USER,
          payload: true,
        });
        return {
          type: LOGIN_USER,
          payload: true,
        };
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
      Authorization: accessToken,
    },
  };
  axios({
    method: "post",
    url: "http://localhost:8080/api/v1/users/logout",
    headers: config.headers,
  })
    .then(async (res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    type: LOGOUT_USER,
    payload: false,
  };
};

export const setLoginStatus = (status) => {
  localStorage.setItem("isLogin", status);
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
