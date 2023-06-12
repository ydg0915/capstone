import { styled } from "styled-components";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 6.25rem;
  display: flex;
  background-color: whitesmoke;
`;

const ProfileBox = styled.div`
  width: 43.75rem;
  height: 31.25rem;
  border: none;
  border-radius: 1.875rem;
  box-shadow: 0px 0.188rem 0.188rem rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  background-color: white;
  span {
    margin-bottom: 1.875rem;
  }
`;

const Chat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 0.625rem;
  background-color: #fee500;
  padding: 0.625rem 1.25rem;
  color: black;
  margin-right: 1.25rem;
  svg {
    margin-right: 0.313rem;
  }
`;
const EditProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 0.625rem;
  background-color: whitesmoke;
  padding: 0.625rem 1.25rem;
  color: black;
  svg {
    margin-right: 0.313rem;
  }
`;

const Subbox = styled.div`
  display: flex;
  height: 50%;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  font-weight: 600;
  p {
    margin: 1.125rem 0px;
  }
`;
const ProduceBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.625rem;
  height: auto;
  padding: 1.25rem;
  border-top: 0.125rem solid gray;
  font-weight: 600;
  p:first-child {
    margin-bottom: 1.25rem;
    opacity: 0.5;
  }
`;

const EtcBox = styled.div`
  width: 60%;
  height: 100%;
  background-color: white;
  border-radius: 1.875rem;
  border: 0.188rem solid white;
  margin-left: 1.875rem;
  display: flex;
  flex-direction: column;
  padding: 0.625rem;
`;

const TopDiv = styled.div`
  width: 100%;
  height: 50%;
  border-bottom: 0.125rem solid black;
  display: flex;
  padding: 1.25rem;
`;

const StackBox = styled.div`
  border-right: 0.125rem solid black;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  span {
    margin-bottom: 1.875rem;
    &:first-child {
      font-size: 1.6rem;
    }
  }
  ul {
    width: 50%;
    display: flex;
    justify-content: space-around;
  }
  ul > span {
    background-color: #7d92e9;
    padding: 0.188rem 1.25rem;
    font-size: 1.6rem;
    border-radius: 1.875rem;
    appearance: none;
    color: black;
  }
  align-items: center;
  font-weight: 600;
`;

const HopePro = styled.div`
  font-weight: 600;
  padding-left: 1.875rem;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  span {
    &:first-child {
      font-size: 1.6rem;
      margin-bottom: 1.25rem;
    }
  }
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  ul > span {
    padding: 0.188rem 12px;
    font-size: 0.938rem;
    border-radius: 0.938rem;
  }
  align-items: center;
`;
const CircleStyle = styled.div`
  width: 0.938rem;
  height: 0.938rem;
  border-radius: 0.469rem;
  background-color: yellowgreen;
  margin-right: 0.625rem;
`;

const CircleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
`;

function Profile() {
  interface User {
    username: string;
    email: string;
    id: number;
    introduction: string;
  }
  const [user, setUser] = useState<User | null>(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get("http://localhost:8080/api/v1/users/me", config)
      .then((res) => {
        const userData = res.data.data;
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken]);

  return (
    <>
      <Header />
      <Wrapper>
        <ProfileBox>
          <Subbox>
            <p>{user?.username}</p>
            <p style={{ marginBottom: "50px" }}>{user?.email}</p>
            <div style={{ display: "flex" }}>
              <Link to={"/chat"}>
                <Chat>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
                  </svg>
                  1대1 채팅
                </Chat>
              </Link>
              <Link to={"/editProfile"}>
                <EditProfile>프로필 수정</EditProfile>
              </Link>
            </div>
          </Subbox>
          <ProduceBox>
            <p>자기소개</p>
            <p>{user?.introduction}</p>
          </ProduceBox>
        </ProfileBox>
        <EtcBox>
          <TopDiv>
            <StackBox>
              <span>선호하는 기술</span>
            </StackBox>
            <HopePro>
              <span>프로젝트 목록</span>
            </HopePro>
          </TopDiv>
          <div
            style={{
              padding: "1.25rem",
              fontWeight: "600",
              fontSize: "1.7rem",
            }}
          >
            Github Contribution
          </div>
        </EtcBox>
      </Wrapper>
    </>
  );
}
export default Profile;
