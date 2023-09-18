import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "./LogoutBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const MenuContainer = styled.div`
  background-color: whitesmoke;
  opacity: 1;
  padding: 5px;
  width: 200px;
  display: "block";
  border-radius: 10px;
  position: absolute;
  top: 40px;
  right: 20px;
  box-shadow: 0px 0.188rem 0.188rem rgba(0, 0, 0, 0.2);
`;
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

const Button = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Writer = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 14px;
  border-radius: 50%;
  background-color: #a0f1d0;
`;

const HandleUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLogin = localStorage.getItem("isLogin") === "true";
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
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
        <Writer>{user.data.username[0]}</Writer>
        {isOpen === false ? null : (
          <MenuContainer ref={menuRef}>
            <Link to={"/profile"}>
              <MenuItem>
                <span>마이 페이지</span>
              </MenuItem>
            </Link>
            <LogoutButton />
          </MenuContainer>
        )}
      </Button>
    </>
  );
};

export default HandleUser;
