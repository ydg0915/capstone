import styled from "styled-components";
import React from "react";

const RecentBox = styled.div`
  padding: 5%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RecentProject = styled.div``;

function Recent(projects) {
  return (
    <>
      <RecentBox>
        <span> 최근에 올라온 모집 글</span>
        <RecentProject></RecentProject>
      </RecentBox>
    </>
  );
}

export default Recent;
