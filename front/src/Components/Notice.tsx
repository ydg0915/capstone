import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const SlideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  overflow: hidden;
  height: 300px;
`;

const SlideContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
  background-color: black;
  animation: ${SlideInAnimation} 5s ease-in-out infinite;
`;

const SlideComponent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ButtonBox = styled.div`
  z-index: 999;
`;
const Slider = ({ notices }) => {
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) =>
        prevIndex === notices.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [notices]);

  const handleNoticeClick = (index) => {
    setCurrentNoticeIndex(index);
  };

  return (
    <Wrapper className="slider-container">
      {notices.map((NoticeComponent, index) => (
        <SlideContainer
          key={index}
          className={`notice ${index === currentNoticeIndex ? "active" : ""}`}
        >
          <SlideComponent>
            <NoticeComponent />
          </SlideComponent>
        </SlideContainer>
      ))}
      <ButtonBox style={{ marginTop: "400px" }} className="slider-buttons">
        {notices.map((_, index) => (
          <button
            key={index}
            className={`slider-button ${
              index === currentNoticeIndex ? "active" : ""
            }`}
            onClick={() => handleNoticeClick(index)}
          ></button>
        ))}
      </ButtonBox>
    </Wrapper>
  );
};
export default Slider;
