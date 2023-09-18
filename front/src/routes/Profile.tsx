import styled from "styled-components";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import SideNav from "../Components/SideNav";
const Container = styled.div`
  display: flex;
  background-color: #f8f9fa;
`;

const Wrapper = styled.div`
  width: 70%;
  margin: 50px 5% 100px 3%;
  display: flex;
`;
const MyInfo = styled.div`
  width: 500px;
  height: 300px;

  h1 {
    font-size: 27px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #dadce0;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 3%;
  border-radius: 10px;
  border-bottom: 1px solid #a0f1d0;
`;

const UserCircle = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: #a0f1d0;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 130px;
  span:first-child {
    margin-bottom: 10px;
    color: rgba(0, 0, 0, 1);
    font-weight: 600;
  }
`;
const EditProfile = styled.div`
  padding: 2% 5%;
  font-size: 18px;
  font-weight: 600;
  color: #287657;
  border: 2px solid #a0f1d0;
  border-radius: 10px;
  cursor: pointer;
`;

const EtcBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 150px);
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 20px;
  padding: 5%;
  span:nth-child(odd) {
    font-weight: 600;
    font-size: 18px;
  }
`;

const MyProject = styled.div`
  width: 500px;
  height: 300px;
  margin-left: 120px;
  h1 {
    font-size: 27px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const ProejctBox = styled.div`
  background-color: white;
  padding: 20px 10px;
  font-size: 25px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dadce0;
`;

function Profile() {
  interface User {
    username: string;
    email: string;
    id: number;
    introduction: string;
  }
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);
  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users/me", config)
      .then((res) => {
        const userData = res.data.data;
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
        window.alert("로그인이 필요한 페이지입니다.");
        history.push("/login");
      });
  }, [accessToken]);

  return (
    <>
      <Header />
      <Container>
        <SideNav />
        <Wrapper>
          <MyInfo>
            <h1>내 프로필</h1>
            <InfoBox>
              <Info>
                <UserCircle>{user?.username[0]}</UserCircle>
                <UserInfo>
                  <span>{user?.username}</span>
                  <span>{user?.email}</span>
                </UserInfo>
                <EditProfile>
                  {" "}
                  <FontAwesomeIcon icon={faPencil} /> 수정
                </EditProfile>
                <hr />
              </Info>
              <EtcBox>
                <span>닉네임</span>
                <span>{user?.username}</span>
                <span>이메일</span>
                <span>{user?.email}</span>
                <span>자기소개</span>
                <span>{user?.introduction}</span>
              </EtcBox>
            </InfoBox>
          </MyInfo>
          <MyProject>
            <h1>내 프로젝트</h1>
            <ProejctBox>
              <span>모집 중인 프로젝트가 없어요</span>
            </ProejctBox>
          </MyProject>
        </Wrapper>
      </Container>
    </>
  );
}
export default Profile;
