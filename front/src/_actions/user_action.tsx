import axios from "axios";
import {
  HIDE_ERROR_MESSAGE,
  LOGIN_USER,
  LOGOUT_USER,
  SET_PROJECTS,
  SHOW_ERROR_MESSAGE,
} from "./types";
import { Dispatch } from "redux";

export const loginUser = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        formData
      );
      const data = res.data.data;

      if (data) {
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const userRes = await axios.get(
          "http://localhost:8080/api/v1/users/me",
          config
        );
        const userData = userRes.data;
        localStorage.setItem("user", JSON.stringify(userData));

        dispatch({
          type: LOGIN_USER,
          payload: true,
        });
      }
    } catch (error: any) {
      console.log(error);
      dispatch(
        showErrorMessage(
          error.response?.data?.message?.split(",")[0] || "오류가 발생했습니다"
        )
      );
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

export const deleteUser = (formData) => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.delete(
        "http://localhost:8080/api/v1/users/me",
        {
          headers: {
            Authorization: config.headers.Authorization,
          },
          data: {
            formData,
          },
        }
      );
      dispatch({ type: "DELETE_USER_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "DELETE_USER_FAILURE" });
    }
  };
};

export const setProjectss = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

export const againLogin = () => {
  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/users/userTest",
        config
      );
      console.log(response.status);
      if (response.status === 200) {
        dispatch({
          type: LOGIN_USER,
          payload: true,
        });
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/v1/users/reissue",
          config
        );
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
};
