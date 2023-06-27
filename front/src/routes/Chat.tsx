import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 3.125rem 12.5rem 0px 12.5rem;
  background-color: whitesmoke;
  svg {
    width: 1.875rem;
    height: 1.875rem;
    margin-bottom: 1.875rem;
  }
`;

const ChatBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Chatting = styled.div`
  width: 30%;
  height: 43.75rem;
  background-color: #b1c7d9;
  border-radius: 3.125rem;
  position: relative;

  input {
    width: 100%;
    height: 7.5rem;
    border-radius: 0.188rem;
    border: 0;
    position: absolute;
    bottom: -0.313rem;
    line-height: 0.313rem;
  }

  button {
    font-size: 0.75rem;
    font-weight: 600;
    background-color: #feff86;
    border: 0;
    width: 10%;
    border-radius: 0.313rem;
    height: 1.875rem;
    position: absolute;
    right: 0.625rem;
    bottom: 0.313rem;
    float: right;
  }
`;
const ChatList = styled.div`
  width: 50%;
  height: 43.75rem;
  border-radius: 3.75rem;
  background-color: teal;
  border: 0.313rem solid white;
`;

function Chat() {
  return (
    <>
      <Wrapper>
        <Link to={"/"}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </span>
        </Link>
        <ChatBox>
          <Chatting>
            <form>
              <input></input>
              <button>전송</button>
            </form>
          </Chatting>
          <ChatList></ChatList>
        </ChatBox>
      </Wrapper>
    </>
  );
}
export default Chat;
