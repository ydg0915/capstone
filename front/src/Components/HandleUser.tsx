import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "./LogoutBtn";
import { useSelector } from "react-redux";
import { RootState } from "../_reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faCircleUser,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const MenuContainer = styled.div`
  background-color: whitesmoke;
  opacity: 1;
  width: 200px;
  padding: 10px;
  display: "block";
  border-radius: 10px;
  position: absolute;
  top: 40px;
  right: 20px;
  box-shadow: 0px 0.188rem 0.188rem rgba(0, 0, 0, 0.2);
`;
const MenuItem = styled.a`
  display: flex;
  color: #333;
  text-decoration: none;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  &:last-child {
    display: flex;
    align-items: center;
  }

  &:hover {
    background-color: #ddd;
  }
`;

const Button = styled.div`
  position: relative;
  cursor: pointer;
`;

const HandleUser = () => {
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
          icon={faCircleUser}
          style={{ color: "#1361e7", marginRight: "10px" }}
        />
        {isOpen === false ? null : (
          <MenuContainer ref={menuRef}>
            <MenuItem>
              <Link to={"/profile"}>
                <span>마이 페이지</span>
              </Link>
            </MenuItem>
            <MenuItem>
              <LogoutButton />
              <FontAwesomeIcon
                style={{ width: "20px", marginLeft: "20px" }}
                icon={faRightFromBracket}
              />
            </MenuItem>
          </MenuContainer>
        )}
      </Button>
    </>
  );
};

export default HandleUser;
