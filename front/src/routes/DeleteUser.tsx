import styled from "styled-components";
import Header from "../Components/Header";
import axios from "axios";
import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  hideErrorMessage,
  loginUser,
} from "../_actions/user_action";
import { Link, Redirect, useHistory } from "react-router-dom";
import { RootState, store } from "../_reducers";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
`;

const Box = styled.div`
  width: 37.5rem;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 100px 6.25rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

const JoinString = styled.span`
  font-size: 17px;
  font-weight: 800;
`;
const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
`;

const Sub = styled.span`
  font-size: 15px;
  color: #838486;
  margin-top: 55px;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1.875rem;
`;
const InputId = styled.input`
  width: 100%;
  height: 3.125rem;
  border: 0.063rem solid rgba(0, 0, 0, 0.3);
  border-radius: 0.313rem;
  outline: none;
  padding: 0px 5%;
  &::placeholder {
    font-size: 0.938rem;
  }
  &:nth-child(2) {
    margin-top: 0.5rem;
  }
`;
const Btn = styled.input`
  width: 100%;
  height: 3.125rem;
  background-color: #7d92e9;
  outline: none;
  color: white;
  border: 0 solid black;
  font-size: 1.063rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1.875rem;
  border-radius: 0.313rem;
  cursor: pointer;
`;
export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: 1.25rem;
`;
function DeleteUser() {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);
  let errorMessage = useSelector(
    (state: RootState) => state.errorReducer.errorMessage
  );
  const formData = { password };
  const history = useHistory();

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const btnPrevent = async (event) => {
    event.preventDefault();
    await store.dispatch(deleteUser(formData));
  };

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        dispatch(hideErrorMessage());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage, dispatch]);
  return (
    <>
      <Header />
      <Container>
        <Box>
          <Title>회원 탈퇴</Title>
          <Sub>보안을 위해 비밀번호를 다시 한번 입력해주세요</Sub>
          <FormBox onSubmit={btnPrevent}>
            <InputId
              onChange={passwordChange}
              type="password"
              placeholder="비밀번호"
              value={password}
            ></InputId>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <Btn type="submit" value={"회원 탈퇴"}></Btn>
          </FormBox>
        </Box>
      </Container>
    </>
  );
}

export default DeleteUser;
