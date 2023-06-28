import React from "react";
import styled from "styled-components";

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
  return <Loading>로딩중...</Loading>;
};

export default LoadingComponent;
