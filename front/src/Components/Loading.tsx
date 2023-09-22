import React, { useState } from "react";
import styled from "styled-components";
import { useCheckSession } from "../checkSession";

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: 600;
`;

const LoadingComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  const checkLoginStatus = async () => {
    await useCheckSession();
    setTimeout(() => {
      // setIsLoggedIn(true); // 세션이 유효한 경우
      setIsLoading(false); // 로딩 완료
    }, 2000);
  };

  return <Loading>로딩중...</Loading>;
};

export default LoadingComponent;
