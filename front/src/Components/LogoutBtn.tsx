import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser, setLoginStatus } from "../_actions/user_action";

function LogoutButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = localStorage.getItem("accessToken");

  const handleLogout = async () => {
    try {
      dispatch(logoutUser(accessToken));
      localStorage.clear();
      dispatch(setLoginStatus(false));
      await history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}

export default LogoutButton;
