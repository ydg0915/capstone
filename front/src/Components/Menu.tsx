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
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const MenuContainer = styled.div`
  background-color: #f1f1f1;
  width: 200px;
  border-radius: 10px;
  padding: 10px;
  display: "block";
  position: absolute;
  left: 20px;
  top: 50px;
`;
const XBox = styled.div`
  width: 100%;
  height: 25px;
`;

const MenuItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  left: 150px;
  top: 30px;
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
          style={{ float: "left", fontSize: "25px" }}
        />
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
            {isLogin === true ? (
              <>
                <MenuItem>
                  <Link to={"/chat"}>
                    <span>채팅</span>
                  </Link>
                  <FontAwesomeIcon icon={faArrowRight} />
                </MenuItem>
                <MenuItem>
                  <Link to={"/createproject"}>
                    <span>프로젝트 생성</span>
                  </Link>
                  <FontAwesomeIcon icon={faArrowRight} />
                </MenuItem>
              </>
            ) : null}

            {isLogin === true ? (
              <MenuItem>
                <LogoutButton />
                <FontAwesomeIcon
                  style={{ width: "20px" }}
                  icon={faRightFromBracket}
                />
              </MenuItem>
            ) : (
              <MenuItem>
                <Link to={"/login"}>
                  <span>로그인</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </MenuItem>
            )}
          </MenuContainer>
        )}
      </Button>
    </>
  );
};

export default Menu;
