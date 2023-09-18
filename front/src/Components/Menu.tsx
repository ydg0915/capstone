import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "./LogoutBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const MenuContainer = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 200px;
  border-radius: 10px;
  padding: 10px;
  display: "block";
  position: absolute;
  left: 20px;
  top: 50px;
`;
const XBox = styled.div`
  width: auto;
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
  border-radius: 5px;

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
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
          <MenuContainer ref={menuRef}>
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
                <Link to={"/chat"}>
                  <MenuItem>
                    <span>채팅</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </MenuItem>
                </Link>
                <Link to={"/createproject"}>
                  <MenuItem>
                    <span>프로젝트 생성</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </MenuItem>
                </Link>
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
              <Link to={"/login"}>
                <MenuItem>
                  <span>로그인</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </MenuItem>
              </Link>
            )}
          </MenuContainer>
        )}
      </Button>
    </>
  );
};

export default Menu;
