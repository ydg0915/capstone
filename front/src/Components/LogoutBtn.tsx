import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setLoginStatus } from "../_actions/user_action";
import { RootState } from "../_reducers";

function LogoutButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = localStorage.getItem("accessToken");
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);

  const handleLogout = async () => {
    try {
      dispatch(logoutUser(accessToken));
      setLoginStatus(false);
      localStorage.clear();
      history.go(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ cursor: "pointer" }} onClick={handleLogout}>
      로그아웃
    </div>
  );
}

export default LogoutButton;
