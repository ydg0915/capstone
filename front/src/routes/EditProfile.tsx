import styled from "styled-components";
import Header from "../Components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ErrorMessage } from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_reducers";
import { hideErrorMessage, showErrorMessage } from "../_actions/user_action";

const Container = styled.div`
  width: 100vw;
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
  margin-top: 0.5rem;
  &::placeholder {
    font-size: 0.938rem;
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

function EditProfile() {
  const [introduction, setIntroduction] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  let errorMessage = useSelector(
    (state: RootState) => state.errorReducer.errorMessage
  );
  const usernameChange = (event) => {
    setIntroduction(event.target.value);
  };

  const newPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const oldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const body = {
    introduction,
    newPassword,
    oldPassword,
  };

  const btnPrevent = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 헤더에 Bearer 토큰 추가
      },
    };

    if (introduction == "") {
      dispatch(showErrorMessage("자기소개를 입력해주세요"));
    } else if (oldPassword == "") {
      dispatch(showErrorMessage("기존 비밀번호를 입력해주세요"));
    } else if (newPassword == "") {
      dispatch(showErrorMessage("새 비밀번호를 입력해주세요"));
    } else {
      axios
        .patch("http://localhost:8080/api/v1/users/me", body, config)
        .then((res) => {
          console.log(res);
          history.push("/profile");
        })
        .catch((error) => {
          console.log(error);
          switch (error.response.status) {
            case 400:
              dispatch(
                showErrorMessage(
                  "비밀번호 형식(8~16자리 영어,숫자,특수문자)을 지켜주세요"
                )
              );
              break;
            case 403:
              break;
            case 409:
              dispatch(
                showErrorMessage("이미 존재하는 아이디 혹은 이메일입니다")
              );
              break;
            default:
              dispatch(showErrorMessage("알 수 없는 오류가 발생했습니다"));
              break;
          }
        });
    }
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
          <Title>프로필 수정</Title>
          <FormBox onSubmit={btnPrevent}>
            <InputId
              onChange={usernameChange}
              type="text"
              placeholder="자기소개 수정"
            ></InputId>
            <InputId
              onChange={oldPasswordChange}
              type="password"
              placeholder="기존 비밀번호 입력"
            ></InputId>
            <InputId
              onChange={newPasswordChange}
              type="password"
              placeholder="새 비밀번호 입력"
            ></InputId>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <Btn type="submit" value={"수정"}></Btn>
          </FormBox>
        </Box>
      </Container>
    </>
  );
}

export default EditProfile;
