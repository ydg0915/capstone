import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleUser,
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Menu from "./Menu";
import HandleUser from "./HandleUser";
import { useHistory } from "react-router-dom";
import { RootState, store } from "../_reducers";
import { useSelector } from "react-redux";

const Nav = styled.div`
  display: flex;
  align-items: center;
  vertical-align: middle;
  justify-content: space-between;
  position: relative;

  width: 100%;
  height: 80px;
  padding: 0px 150px 0px 50px;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
  box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 999;
  backdrop-filter: blur(6px);
  button {
    border: none;
    background-color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
`;

const NavRoute = styled.nav`
  display: flex;
  width: 33%;
  justify-content: end;
  align-items: center;
  span {
    margin-right: 20px;
    font-size: 17px;
  }

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
  svg {
    width: 25px;
    margin-right: 40px;
  }
`;

const NotificationCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 6px;
  border-radius: 50%;
  background-color: #7d92e9;
  color: white;
  font-size: 14px;
  position: absolute;
  top: -12px;
  left: 10px;
`;

const NotificationBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  background-color: white;
  border: 1px solid #dadce0;
  border-radius: 20px;
  top: 50px;
  font-size: 16px;
  z-index: 999;
  width: 250px;
  padding: 20px;
  span {
    color: rgba(0, 0, 0, 1);

    text-decoration: none;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #dadce0;
  }
`;
const NotifiString = styled.div`
  font-size: 23px;
  margin-bottom: 20px;
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

  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);
  const accessToken = localStorage.getItem("accessToken");
  const [countNotification, setCountNotification] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openNotification, setOpenNotification] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenNotification(false);
    }
  };
  const obje = localStorage.getItem("user");
  const user: User = obje ? JSON.parse(obje) : null;

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const homeClick = () => {
    history.push("/");
  };

  const NotifiStateClick = () => {
    setOpenNotification((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLogin) {
          const notificationsResponse = await axios.get(
            "http://localhost:8080/api/v1/notifications",
            config
          );
          const countResponse = await axios.get(
            "http://localhost:8080/api/v1/notifications/count",
            config
          );

          setNotifications(notificationsResponse.data.data);
          setCountNotification(countResponse.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isLogin]);

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
        {/* <Menu /> */}
        <Link to={"/"}>
          <a
            onClick={homeClick}
            style={{
              width: "30%",
              fontSize: "30px",
              color: "#1361e7",
              lineHeight: "3px",
            }}
          >
            Synergy
          </a>
        </Link>
      </div>

      {isLogin === true ? (
        <NavRoute>
          <Notifi onClick={NotifiStateClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
            </svg>

            {countNotification === 0 ? null : (
              <NotificationCount>{countNotification}</NotificationCount>
            )}
            {openNotification === false ? null : (
              <NotificationBox ref={menuRef}>
                <NotifiString>알림</NotifiString>
                {notifications.map((notification) => (
                  <span
                    key={notification.id}
                    onClick={() => handleNotifi(notification.id)}
                    style={{
                      display: notification.read ? "none" : "",
                    }}
                  >
                    {notification.content}
                  </span>
                ))}
              </NotificationBox>
            )}
          </Notifi>
          <HandleUser />
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
