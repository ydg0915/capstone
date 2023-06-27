import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./_reducers";
import { setLoginStatus } from "./_actions/user_action";

export function useCheckSession() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const bfAccessToken = localStorage.getItem("accessToken");
  const bfRefreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    const reIssue = async () => {
      try {
        const Token = {
          headers: {
            ACCESS_TOKEN: bfAccessToken,
            REFRESH_TOKEN: bfRefreshToken,
          },
        };

        const response = await axios.post(
          "http://localhost:8080/api/v1/users/reissue",
          null,
          {
            headers: Token.headers,
          }
        );

        console.log(response.data);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
      } catch (error) {
        console.log(error);
      }
    };

    reIssue();
  }, []);

  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);
  const storedUser = localStorage.getItem("user");
  const Login = localStorage.getItem("isLogin");
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken && storedUser) {
      setLoginStatus(true);
    } else {
      console.log("로그인되지 않은 상태입니다.");
    }
  }, [isLogin, accessToken, refreshToken]);
}
