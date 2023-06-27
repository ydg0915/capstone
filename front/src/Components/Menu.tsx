import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "./LogoutBtn";
import { useSelector } from "react-redux";
import { RootState } from "../_reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const MenuContainer = styled.div`
  background-color: #f1f1f1;
  width: 200px;
  height: 100vh;
  padding: 10px;
  display: "block";
  position: fixed;
  left: 0px;
  top: 0px;
`;
const XBox = styled.div`
  width: 100%;
  height: 25px;
`;

const MenuItem = styled.a`
  display: flex;
  justify-content: space-between;
  color: #333;
  text-decoration: none;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #ddd;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  float: left;
  position: absolute;
  left: 20px;
  top: 25px;
`;

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoginString = localStorage.getItem("isLogin");
  const isLogin = isLoginString === "true";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={toggleMenu}>
        <FontAwesomeIcon
          icon={faBars}
          style={{ float: "left", fontSize: "30px" }}
        />
      </Button>
      {isOpen === false ? null : (
        <MenuContainer>
          <XBox>
            <FontAwesomeIcon
              onClick={toggleMenu}
              icon={faXmark}
              style={{
                float: "right",
                cursor: "pointer",
                fontSize: "30px",
                display: "block",
              }}
            />
          </XBox>
          <MenuItem href="#">
            <Link to={"/chat"}>
              <span>채팅</span>
            </Link>
            <FontAwesomeIcon icon={faArrowRight} />
          </MenuItem>
          <MenuItem href="#">
            <Link to={"/createproject"}>
              <span>프로젝트 생성</span>
            </Link>
            <FontAwesomeIcon icon={faArrowRight} />
          </MenuItem>
          <MenuItem href="#">
            {isLogin === true ? (
              <>
                <LogoutButton />
                <FontAwesomeIcon icon={faArrowRight} />
              </>
            ) : (
              <Link to={"/login"}>
                <span>로그인</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            )}
          </MenuItem>
        </MenuContainer>
      )}
    </>
  );
};

export default Menu;
