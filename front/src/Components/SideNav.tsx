import styled from "styled-components";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../_reducers";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 250px;
  height: calc(100vh - 80px);
  border-right: 1px solid #dadce0;
  position: sticky;
  top: 80px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  color: #586672;
`;

const NavBox = styled.ul`
  font-weight: 600;
  padding-top: 30px;
  height: 200px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  &::last-child {
    margin-top: 30px;
  }
`;

const Nav = styled.li`
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 5px;
  cursor: pointer;
  transition-property: background-color;
  transition-timing-function: ease-in-out;

  &:hover {
    background-color: #d1f5e6;
    cursor: pointer;
  }
`;

const Footer = styled.div`
  line-height: 3;
`;

function SideNav() {
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);

  return (
    <Container>
      {isLogin == true ? (
        <NavBox>
          <Link to={"/"}>
            <Nav>홈</Nav>
          </Link>
          <Link to={"/createproject"}>
            <Nav>모집 글 작성</Nav>
          </Link>
          <Link to={"/chat"}>
            <Nav>채팅방</Nav>
          </Link>
          <br />
          <Link to={"/profile"}>
            <Nav>마이 페이지</Nav>
          </Link>
        </NavBox>
      ) : (
        <NavBox>
          <Link to={"/"}>
            <Nav>홈</Nav>
          </Link>
          <Link to={"/login"}>
            <Nav>로그인</Nav>
          </Link>
        </NavBox>
      )}

      <Footer>
        2023 ~ &copy; Synergy <br />
        캡스톤 디자인{" "}
      </Footer>
    </Container>
  );
}
export default SideNav;
