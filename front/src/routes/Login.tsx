import styled from "styled-components";
import Header from "../Components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideErrorMessage, loginUser } from "../_actions/user_action";
import { useHistory } from "react-router-dom";
import { RootState, store } from "../_reducers";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 37.5rem;
  height: 43.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 6.25rem 6.25rem;
`;
const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
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
  background-color: black;
  color: white;
  font-size: 1.063rem;
  text-align: center;
  margin-top: 1.875rem;
  border-radius: 0.313rem;
  cursor: pointer;
`;
export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875;
  margin-top: 1.25;
`;

// const SocialBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   margin-top: 3.75rem;
// `;

// const GoogleLogin = styled.div`
//   width: 25rem;
//   height: 3.125rem;
//   background-color: whitesmoke;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.25rem;
//   font-weight: 600;
//   border-radius: 0.313rem;
//   svg {
//     margin-right: 0.625rem;
//   }
// `;
// const KakaoLogin = styled.div`
//   width: 25rem;
//   height: 3.125rem;
//   background-color: #fee500;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 0.313rem;
//   margin-top: 0.75rem;
//   font-size: 1.25rem;
//   font-weight: 600;
//   svg {
//     margin-right: 0.625rem;
//   }
// `;
// const Wrapper = styled.div`
//   width: 25rem;
//   height: 3.125rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);
  let errorMessage = useSelector(
    (state: RootState) => state.errorReducer.errorMessage
  );
  const history = useHistory();

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const usernameChange = (event) => {
    setUsername(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const btnPrevent = (event) => {
    event.preventDefault();
    store.dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        dispatch(hideErrorMessage());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage, dispatch]);

  useEffect(() => {
    if (isLogin === true) {
      history.push("/");
    }
  }, [isLogin]);

  return (
    <>
      <Header />
      <Container>
        <Box>
          <Title>로그인</Title>
          <FormBox onSubmit={btnPrevent}>
            <InputId
              onChange={usernameChange}
              className={`${errorMessage ? "error" : ""}`}
              type="text"
              placeholder="아이디"
              value={username}
            ></InputId>
            <InputId
              onChange={passwordChange}
              type="password"
              placeholder="비밀번호"
              value={password}
            ></InputId>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <Btn type="submit" value={"로그인"}></Btn>
          </FormBox>
        </Box>
      </Container>
    </>
  );
}

export default Login;
