import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../_actions/user_action";
import { RootState } from "../_reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const MenuItem = styled.div`
  display: flex;
  color: #333;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 10px;
  margin-top: 10px;
  &:last-child {
    display: flex;
    align-items: center;
  }

  &:hover {
    background-color: #dadce0;
  }
`;

function LogoutButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = localStorage.getItem("accessToken");
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser(accessToken));
      localStorage.clear();
      history.push("/");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MenuItem onClick={handleLogout}>
      <span>로그아웃</span>
      <FontAwesomeIcon
        style={{ width: "15px", height: "15px", marginLeft: "20px" }}
        icon={faRightFromBracket}
      />
    </MenuItem>
  );
}

export default LogoutButton;
