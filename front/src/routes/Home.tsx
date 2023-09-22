import styled from "styled-components";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProjectList from "../Components/ProjectList";
import { useContext, useEffect, useState } from "react";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { LoadingContext } from "../Components/LoadingContext";
import LoadingComponent from "../Components/Loading";
import axios from "axios";
import SideNav from "../Components/SideNav";
import { useDispatch } from "react-redux";
import { setProjectss } from "../_actions/user_action";

interface parts {
  name: string;
  stack: [string];
}

const parts = [
  { name: "프론트엔드", stack: ["React", "JavaScript", "Vue", "Python"] },
  { name: "백엔드", stack: ["Spring", "NodeJS", "Django", "Go"] },
  { name: "디자이너", stack: ["Figma", "그림판", "PhotoShop"] },
  {
    name: "모바일",
    stack: ["Kotlin", "Java", "Swift", "Flutter", "ReactNative"],
  },
];

const Container = styled.div`
  position: relative;
  background-color: #f8f9fa;
`;

const FlexBox = styled.div`
  display: flex;
`;

const DotBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.625rem;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div`
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background-color: gray;
`;

const ScrollUp = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border: 4px solid #9ac5f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #9ac5f4;
  cursor: pointer;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  transition: transform 0.3s ease;
  span {
    font-size: 16px;
  }
`;

const Wrapper = styled.div`
  width: 86%;
`;
const NoticeBox = styled.div`
  width: auto;
  height: 350px;
  align-items: flex-start;
  background-color: #a0f1d0;
  margin: 0px 0px 1.875rem 0px;
  padding: 30px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 35px;
  font-weight: 800;
  background-image: url(https://squeezegrowth.com/wp-content/uploads/2022/09/ID-2268-297-tools-to-create-interactive-infographics-2048x956.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
`;
const Notice = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: #17e2db;
  font-size: 18px;
  color: #586672;
`;
const NoticeString = styled.span`
  line-height: 1.5;
`;

const Toggle = styled.label`
  margin: 50px 180px 0px 72%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 600;
  [type="checkbox"] {
    appearance: none;
    position: relative;
    border: max(2px, 0.1em) solid gray;
    border-radius: 1.25em;
    width: 2.25em;
    height: 1.25em;
    margin-right: 10px;
  }
  [type="checkbox"]::before {
    content: "";
    position: absolute;
    left: 0;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: scale(0.8);
    background-color: #9ac5f4;
    transition: left 250ms linear;
  }
  [type="checkbox"]:checked::before {
    background-color: white;
    left: 1em;
  }

  [type="checkbox"]:checked {
    background-color: #1361e7;
    border-color: #1361e7;
  }
  [type="checkbox"]:disabled {
    border-color: lightgray;
    opacity: 0.7;
    cursor: not-allowed;
  }

  [type="checkbox"]:disabled:before {
    background-color: lightgray;
  }

  [type="checkbox"]:disabled + span {
    opacity: 0.7;
    cursor: not-allowed;
  }

  [type="checkbox"]:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) solid #1361e7;
  }

  [type="checkbox"]:enabled:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
  }
  .span {
    font-size: 1.5rem;
    font-weight: 800;
  }
`;
// const Filter = styled.div`
//   width: auto;
//   height: 21.875rem;
//   background-color: #7d92e9;
//   margin: 1.875rem 18.75rem 1.875rem 18.75rem;
//   display: flex;
//   flex-direction: column;
//   align-items: start;
//   border-radius: 1.25rem;
//   padding: 1.25rem 1.25rem;
//   font-weight: 600;
//   color: ${(props) => props.theme.bgColor};
// `;

// const Part = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   span {
//     font-size: 1.438rem;
//     padding: 0px 0.625rem;
//     border-right: 0.125rem solid white;
//     margin-right: 0.625rem;
//     cursor: pointer;

//     &:last-child {
//       border: none;
//     }
//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

// const Stack = styled.div`
//   display: flex;
//   font-size: 1.563rem;
//   margin-top: 3.125rem;
//   li {
//     list-style: none;
//     margin-right: 1.25rem;
//     cursor: pointer;
//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

// const Select = styled.div`
//   display: flex;
//   font-size: 0.938rem;
//   margin-top: 6.25rem;
//   li {
//     display: flex;
//     align-items: center;
//     list-style: none;
//     margin-right: 1.25rem;
//     background-color: whitesmoke;
//     padding: 0.313rem 0.625rem;
//     color: black;
//     border-radius: 1.875rem;
//     cursor: pointer;
//     svg {
//       margin-left: 0.313rem;
//     }
//   }
// `;

function Home() {
  const [part, setPart] = useState("프론트엔드");
  const [stack, setStack] = useState<any[]>([]);
  const [select, setSelect] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const ee = ["1", "2", "3", "4"];
  const loading = useContext(LoadingContext);

  const scrollUp = () => {
    const scrollToTop = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > 0) {
        const distance = Math.max(40, currentPosition * 0.2);
        window.scrollTo(0, currentPosition - distance);
        requestAnimationFrame(scrollToTop);
      }
    };

    scrollToTop();
  };
  // const partClick = (event) => {
  //   setPart(event.target.innerText);
  // };
  // const selectClick = (event) => {
  //   setSelect((select) => [...select, event.target.innerText]);
  // };
  // const deleteClick = (event) => {
  //   const index = select.indexOf(event.target.innerText);
  //   select.splice(index, 1);
  //   console.log(select);
  // };
  // useEffect(() => {
  //   const eventSource = new EventSource(
  //     "http://localhost:8080/api/v1/notifications/subscribe"
  //   );

  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     setMessage(data.message);
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // });

  useEffect(() => {
    switch (part) {
      case "프론트엔드":
        setStack(parts[0].stack);
        break;
      case "백엔드":
        setStack(parts[1].stack);
        break;
      case "디자이너":
        setStack(parts[2].stack);
        break;
      case "모바일":
        setStack(parts[3].stack);
        break;
    }
  }, [part]);

  interface Project {
    id: number;
    position: string[];
    recruitmentPeriod: string;
    techStack: string[];
    title: string;
    content: string;
    totalCommentsAndReplies: number;
    userId: number;
    username: string;
    view: number;
  }

  const dispatch = useDispatch();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isChecked, setIsChecked] = useState(true);
  const [size, setSize] = useState(15);
  const [startPage, setStartPage] = useState(1);
  const [counts, setCounts] = useState(0);
  const [blockNum, setBlockNum] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let pageNumber = 0;
  const sort = "DESC";

  const fetchData = async (pageNumber): Promise<any> => {
    try {
      if (isChecked === true) {
        const res = await axios.get(
          `http://localhost:8080/api/v1/posts/recruiting`,
          {
            params: {
              page: pageNumber,
              size,
              sort,
            },
          }
        );
        const projectData = res.data.data;
        setProjects(projectData);
        dispatch(setProjectss(projectData));
        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 1000);
        return projectData;
      } else {
        const res = await axios.get(`http://localhost:8080/api/v1/posts`, {
          params: {
            page: pageNumber,
            size,
            sort,
          },
        });
        const projectData = res.data.data;
        setProjects(projectData);
        dispatch(setProjectss(projectData));
        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 1000);
        return projectData;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    setIsChecked(false);
  }, []);

  const handleSearch = (searchResults: any) => {
    setProjects(searchResults);
  };

  async function loadAllData() {
    let allData = [];
    let newData = await fetchData(pageNumber);

    while (newData.length !== 0) {
      allData = allData.concat(newData);
      pageNumber++;
      newData = await fetchData(pageNumber);
    }
    setCounts(allData.length);
  }
  const btnClick = () => {
    setIsChecked((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchDataAndLoadData = async () => {
      try {
        await loadAllData();
        await fetchData(startPage - 1);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataAndLoadData();
    window.scrollTo(0, 0);
  }, [isChecked, startPage]);

  // useEffect(() => {
  //   dispatch(setProjectss(projects));
  // }, [projects]);
  return (
    <>
      <Container>
        <Header onSearch={handleSearch} />
        <FlexBox>
          <SideNav />
          <Wrapper>
            <NoticeBox>
              <Notice>안내 사항</Notice>
              <NoticeString>
                IT관련 프로젝트
                <br /> 매칭 사이트 Synergy입니다
                {/* +글쓰기 에디터,댓글 닉네임 바뀌는거,
              검색바를 프로젝트리스트로, 회원탈퇴 비찿 오류 해결, 
              북마크 팔로우 구현,채팅창, 로딩 창 구현(헤더 까지 수정), */}
              </NoticeString>
            </NoticeBox>

            <DotBox>
              <Dot />
            </DotBox>

            <Toggle>
              <input
                checked={isChecked}
                onChange={btnClick}
                role="switch"
                type="checkbox"
              />
              <span>모집 중인 글만 보기</span>
            </Toggle>
            <ProjectList projectss={projects} />
            <ScrollUp onClick={scrollUp}>
              <FontAwesomeIcon icon={faAngleUp} />
              <span>Top</span>
            </ScrollUp>
          </Wrapper>
        </FlexBox>
      </Container>

      {/* <NoticeBoard notices={ee} /> */}
      {/* <Filter>
        <Part>
          <span onClick={partClick}>프론트엔드</span>
          <span onClick={partClick}>백엔드</span>
          <span onClick={partClick}>디자이너</span>
          <span onClick={partClick}>모바일</span>
        </Part>
        <Stack>
          {stack.map((stack) => (
            <li onClick={selectClick}>{stack}</li>
          ))}
        </Stack>
        <Select>
          {select.map((select) => (
            <li key={select.id} onClick={deleteClick}>
              {select}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </li>
          ))}
        </Select>
      </Filter> */}
    </>
  );
}

export default Home;
