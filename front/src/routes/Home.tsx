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
import Slider from "../Components/Notice";
import axios from "axios";

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
const Notice = styled.div`
  width: auto;
  height: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #9ac5f4;
  margin: 0px 0px 1.875rem 0px;
  display: flex;
  font-size: 3.125rem;
  font-weight: 800;
  color: white;
`;
const Notice22 = styled.div`
  width: auto;
  height: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: black;
  margin: 0px 0px 1.875rem 0px;
  display: flex;
  font-size: 3.125rem;
  font-weight: 800;
  color: white;
`;
const NoticeBox = styled.div`
  display: flex;
  overflow: hidden;
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

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div style={{ position: "relative" }}>
          <Header onSearch={handleSearch} />
          <Notice>
            <p>
              공지사항, 검색
              {/*  넘어가기, 프로젝트 생성 페이지 좀 더 디테일 하게 +글쓰기
              에디터 미완성 */}
            </p>
          </Notice>
          {/* <NoticeBox>
            <Notice>
              <p>22222</p>
            </Notice>
          </NoticeBox> */}

          <DotBox>
            <Dot />
          </DotBox>
          <ProjectList projects={projects} />
          <ScrollUp onClick={scrollUp}>
            <FontAwesomeIcon icon={faAngleUp} />
            <span>Top</span>
          </ScrollUp>
          <Footer />
        </div>
      )}

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
