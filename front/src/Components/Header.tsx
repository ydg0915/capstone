import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Menu from "./Menu";
import HandleUser from "./HandleUser";

const Nav = styled.div`
  display: flex;
  align-items: center;
  vertical-align: middle;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding: 1.875rem 150px 1.875rem 150px;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};

  button {
    border: none;
    background-color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
`;

const SearchForm = styled.form`
  display: flex;
  width: 40%;
  height: 2.5rem;
  padding: 0px 2%;
  border: 0.125rem solid #1361e7;
  outline: none;
  border-radius: 3.125rem;
  align-items: center;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  &::placeholder {
    font-size: 0.75rem;
    color: black;
    opacity: 0.5;
    font-weight: 600;
  }
`;
const SearchBtn = styled.button`
  border: none;
  outline: none;
  background-color: white;
  font-size: 1rem;
  opacity: 0.5;
  cursor: pointer;
`;

const NavRoute = styled.nav`
  display: flex;
  width: 33%;
  justify-content: end;
  align-items: center;

  svg {
    width: 30px;
    height: 30px;
  }
`;

const Notifi = styled.span`
  cursor: pointer;
  font-size: 20px;
  position: relative;
  color: black;
`;

const NotificationCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  border-radius: 10px;
  background-color: red;
  color: white;
  font-size: 14px;
  position: absolute;
  top: -15px;
  left: 10px;
`;

const NotificationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: gray;
  border: 2px solid whitesmoke;
  color: black;
  border-radius: 20px;
  top: 50px;
  font-size: 16px;
  width: 250px;
  padding: 20px 0px;
  span {
    margin-bottom: 10px;
  }
`;

function Header() {
  interface Notification {
    url: string;
    id: number;
    read: boolean;
    content: string;
  }
  interface User {
    username: string;
    email: string;
    id: number;
    introduction: string;
  }

  const isLoginString = localStorage.getItem("isLogin");
  const [isLogin, setIsLogin] = useState<boolean>();
  const [searchContent, setSearchContent] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [countNotification, setCountNotification] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openNotification, setOpenNotification] = useState(false);

  const obje = localStorage.getItem("user");
  const user: User = obje ? JSON.parse(obje) : null;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const searchChange = (event) => {
    setSearchContent(event.target.value);
  };

  const NotifiStateClick = () => {
    setOpenNotification((prevState) => !prevState);
  };

  useEffect(() => {
    setIsLogin(isLoginString === "true");
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/notifications", config)
      .then((res) => {
        setNotifications(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:8080/api/v1/notifications/count", config)
      .then((res) => {
        setCountNotification(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(isLogin);
  }, [countNotification]);

  const search = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/api/v1/posts/search`,
      params: { content: searchContent },
    })
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNotifi = (notificationId) => {
    axios({
      method: "patch",
      url: `http://localhost:8080/api/v1/notifications/${notificationId}`,
      headers: config.headers,
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <Nav>
      <div style={{ width: "33%" }}>
        <Menu />
        <Link to={"/"}>
          <span
            style={{
              width: "30%",
              marginLeft: "150px",
              fontSize: "30px",
              color: "#1361e7",
              lineHeight: "3px",
            }}
          >
            Synergy
          </span>
        </Link>
      </div>

      <SearchForm onSubmit={search}>
        <SearchInput
          onChange={searchChange}
          value={searchContent}
          type="text"
          placeholder="검색"
        ></SearchInput>
        <SearchBtn type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </SearchBtn>
      </SearchForm>

      {isLogin === true ? (
        <NavRoute>
          <Notifi onClick={NotifiStateClick}>
            <FontAwesomeIcon
              icon={faBell}
              style={{ color: "#1361e7", width: "25px", marginRight: "40px" }}
            />

            {countNotification === 0 ? null : (
              <NotificationCount>{countNotification}</NotificationCount>
            )}
            {openNotification === false ? null : (
              <NotificationBox>
                {notifications.map((notification) => (
                  <span
                    key={notification.id}
                    onClick={() => handleNotifi(notification.id)}
                    style={{
                      textDecoration: notification.read ? "none" : "underline",
                    }}
                  >
                    {notification.content}
                  </span>
                ))}
              </NotificationBox>
            )}
          </Notifi>
          <HandleUser />
          <span>{user.username}님</span>
        </NavRoute>
      ) : (
        <NavRoute>
          <Link to={"/login"}>
            <span>로그인</span>
          </Link>
          <Link to={"/join"}>
            <span>회원가입</span>
          </Link>
        </NavRoute>
      )}
    </Nav>
  );
}

export default Header;
