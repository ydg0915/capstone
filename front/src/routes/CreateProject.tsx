import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../_reducers";

const Wrapper = styled.div`
  padding: 3.125rem 12.5rem 9.375rem 18.75rem;
`;

const Title = styled.div`
  margin-top: 3.125rem;
  display: flex;
  align-items: center;
  border-bottom: 0.125rem solid rgba(0, 0, 0, 0.1);
  padding-bottom: 1.875rem;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.563rem;
    font-weight: 600;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    margin-right: 1.25rem;
    background-color: #7d92e9;
    color: white;
  }
  h1 {
    font-size: 1.563rem;
    font-weight: 600;
  }
`;

const Info = styled.div`
  margin-top: 3.125rem;
  padding: 0px 6.25rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 3.125rem;
  margin-bottom: 6.25rem;
`;
const InfoSelect = styled.div`
  h1 {
    font-size: 1.563rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }
  select {
    width: 50%;
    padding: 0.625rem 0.938rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0.063rem solid #999;
  }

  input {
    width: 50%;
    padding: 0.625rem 0.938rem;
    border: 0.063rem solid #999;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 6.25rem;
  margin-bottom: 6.25rem;
  input {
    padding: 0.625rem 0.625rem;
  }
  input:focus {
    outline: none;
  }
  input::placeholder {
    color: black;
    opacity: 0.8;
  }
  input:first-child {
    margin-bottom: 1.25rem;
    height: 2.5rem;
  }
  input:last-child {
    height: 18.75rem;
  }
`;

const BtnDiv = styled.form`
  display: flex;
  justify-content: end;
  margin-right: 3.125rem;

  button {
    margin-right: 1.25rem;
    background-color: teal;
    border-radius: 0.938rem;
    border: 0;
    color: white;
    font-weight: 600;
    padding: 0.313rem 1.25rem;
    &.submit {
      background-color: #7d92e9;
      border-radius: 1.25rem;
      border: 0;
      color: white;
      padding: 0.313rem 1.25rem;
      font-weight: 600;
    }
  }
  input {
    background-color: #7d92e9;
    border-radius: 1.25rem;
    border: 0;
    color: white;
    padding: 0.313rem 1.25rem;
    font-weight: 600;
  }
`;

function CreateProject() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expectedDuration, setExpectedDuration] = useState(0);
  const [recruitmentPeriod, setRecruitmentPeriod] = useState("");
  const [recruitmentSize, setRecruitmentSize] = useState(0);
  const [position, setPosition] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<string[]>([]);
  const history = useHistory();
  const accessToken = localStorage.getItem("accessToken");

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const contentChange = (event) => {
    setContent(event.target.value);
  };
  const expectedDurationChange = (event) => {
    setExpectedDuration(Number(event.target.value));
  };
  const recruitmentPeriodChange = (event) => {
    setRecruitmentPeriod(event.target.value);
  };
  const recruitmentSizeChange = (event) => {
    setRecruitmentSize(Number(event.target.value));
  };
  const positionChange = (event) => {
    setPosition([...position, event.target.value]);
  };
  const techStackChange = (event) => {
    setTechStack([...techStack, event.target.value]);
  };

  const body = {
    title,
    content,
    expectedDuration,
    recruitmentPeriod,
    recruitmentSize,
    position,
    techStack,
  };

  const btnPrevent = (event) => {
    event.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    console.log(body, config.headers);

    axios({
      method: "post",
      url: "http://localhost:8080/api/v1/posts",
      data: body,
      headers: config.headers,
    })
      .then((res) => {
        console.log(res);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <Wrapper>
        <Title>
          <div>1</div>
          <h1>프로젝트 기본정보</h1>
        </Title>
        <Info>
          <InfoSelect>
            <h1>모집 인원</h1>
            <select value={recruitmentSize} onChange={recruitmentSizeChange}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </InfoSelect>
          <InfoSelect>
            <h1>모집 마감일</h1>
            <input
              value={recruitmentPeriod}
              onChange={recruitmentPeriodChange}
              type="date"
              placeholder="날짜 선택"
            ></input>
          </InfoSelect>
          <InfoSelect>
            <h1>모집 분야</h1>
            <select multiple={true} value={position} onChange={positionChange}>
              <option>FRONTEND</option>
              <option>BACKEND</option>
              <option>DATABASE</option>
              <option>DEVOPS</option>
              <option>ANDROID</option>
              <option>DEVOPS</option>
              <option>IOS</option>
              <option>DESIGNER</option>
              <option>AI</option>
            </select>
          </InfoSelect>
          <InfoSelect>
            <h1>예상기간</h1>
            <select value={expectedDuration} onChange={expectedDurationChange}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </InfoSelect>
          <InfoSelect>
            <h1>사용 스택</h1>
            <select
              multiple={true}
              value={techStack}
              onChange={techStackChange}
            >
              <option>JAVA</option>
              <option>JavaScript</option>
              <option>React</option>
              <option>VUE</option>
              <option>Python</option>
              <option>Angular</option>
              <option>NodeJS</option>
              <option>SpringBoot</option>
              <option>Django</option>
              <option>RubyOnRails</option>
              <option>PHP</option>
              <option>Laravel</option>
              <option>ASPNET</option>
              <option>ExpressJS</option>
              <option>MySQL</option>
              <option>MongoDB</option>
              <option>PostgreSQL</option>
              <option>Docker</option>
              <option>Kubernetes</option>
              <option>Jenkins</option>
              <option>Swift</option>
              <option>AWS</option>
              <option>Kotlin</option>
              <option>Git</option>
              <option>CSharp</option>
              <option>Unity</option>
              <option>TensorFlow</option>
            </select>
          </InfoSelect>
          <InfoSelect>
            <h1>연락 방법</h1>
            <select>
              <option>1대1 채팅</option>
              <option>카카오톡 오픈채팅</option>
            </select>
          </InfoSelect>
        </Info>
        <Title>
          <div>2</div>
          <h1>프로젝트 소개</h1>
        </Title>
        <Description>
          <input
            onChange={titleChange}
            type="text"
            placeholder="제목을 입력해주세요"
          />
          <input
            onChange={contentChange}
            type="text"
            placeholder="프로젝트를 소개해주세요"
          />
        </Description>
        <BtnDiv>
          <Link to={"/"}>
            <button>취소</button>
          </Link>
          <button
            onClick={btnPrevent}
            className="submit"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            글 등록
          </button>
        </BtnDiv>
      </Wrapper>
    </>
  );
}
export default CreateProject;
