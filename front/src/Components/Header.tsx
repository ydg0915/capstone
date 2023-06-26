import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../_reducers";
import LogoutButton from "./LogoutBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 0.25rem;

  padding: 1.875rem 5%;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
  box-shadow: 0px 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  span {
    margin-right: 21.875rem;
  }
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
  width: 30%;
  height: 2.5rem;
  padding: 0px 2%;
  border: 0.125rem solid rgba(0, 0, 0, 0.3);
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
  justify-content: end;
  align-items: center;
  opacity: 0.6;
  span {
    margin-right: 1.563rem;
  }
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

const MiniNotifiBox = styled.div``;

function Header() {
  interface Notification {
    url: string;
    id: number;
    read: boolean;
    content: string;
  }
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);
  const [searchContent, setSearchContent] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [countNotification, setCountNotification] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openNotification, setOpenNotification] = useState(false);

  const history = useHistory();
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
    if (isLogin === true) {
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
    }
  }, [notifications]);

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
      <Link to={"/"}>
        <span>로고</span>
      </Link>

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
          <Link to={"/chat"}>
            <span>채팅</span>
          </Link>
          <Link to={"/createproject"}>
            <span>프로젝트 생성</span>
          </Link>
          <span
            style={{
              cursor: "pointer",
              fontSize: "20px",
              position: "relative",
              color: "black",
            }}
            onClick={NotifiStateClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
            </svg>

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
          </span>
          <Link to={"/profile"}>
            <span>프로필</span>
          </Link>
          <LogoutButton></LogoutButton>
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
