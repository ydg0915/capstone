import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import ListPagenation from "./Paging";
import { ScrollToTop } from "../Router";

const Toggle = styled.label`
  margin: 1.875rem 18.75rem 1.875rem 18.75rem;
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
    background-color: gray;
    transition: left 250ms linear;
  }
  [type="checkbox"]:checked::before {
    background-color: white;
    left: 1em;
  }

  [type="checkbox"]:checked {
    background-color: tomato;
    border-color: tomato;
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
    outline: max(2px, 0.1em) solid tomato;
  }

  [type="checkbox"]:enabled:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
  }
  .span {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const ProjectBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: ". . .";
  grid-auto-rows: minmax(0, 1fr);
  row-gap: 5rem;
  column-gap: 1.875rem;
  margin: 6.25rem 10%;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 18.75rem;
  background-color: whitesmoke;
  border-radius: 3.125rem;
  padding: 1.875rem;
  padding-bottom: 0px;
  color: rgba(0, 0, 0, 0.5);
`;

const Detail = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: space-between;
  align-items: center;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: column;
  &:first-child {
    font-weight: 600;
  }
`;

const Tag = styled.div`
  display: flex;
  margin-top: 0.938rem;
`;

const Range = styled.div`
  width: auto;
  height: auto;
  background-color: #7d92e9;
  padding: 0.438rem 0.5rem;
  font-size: 0.75rem;
  color: white;
  margin-right: 0.938rem;
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Stack = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  span {
    margin-right: 0.625rem;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 7.5rem;
  border-radius: 1.563rem;
  color: black;
  padding: 0.625rem;
  font-weight: 600;
  font-size: 1.563rem;
  text-align: center;
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.125rem;
  border-top: 0.063rem solid;
`;

const UserDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    min-width: 1.563rem;
    height: 1.563rem;
    margin-right: 0.625rem;
  }

  span {
    font-size: 0.938rem;
  }
`;

const ProjectDetail = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    margin-right: 0.625rem;
  }
`;

function ProjectList() {
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
  const [size, setSize] = useState(15); // 한 페이지에 보여줄 데이터의 개수
  const [startPage, setStartPage] = useState(1); // 페이지 초기 값은 1페이지
  const [counts, setCounts] = useState(0); // 데이터의 총 개수를 setCounts 에 저장해서 사용
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0
  let pageNumber = 0;

  const btnClick = () => {
    setIsChecked((prevState) => !prevState);
  };

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
        return projectData;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
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
      <Toggle>
        <input
          checked={isChecked}
          onClick={btnClick}
          role="switch"
          type="checkbox"
        />
        <span>모집 중인 글만 보기</span>
      </Toggle>
      <ProjectBox>
        {projects.map((project) => (
          <Link key={project.id} to={`/${project.id}`}>
            <Project>
              <Detail>
                <TagBox>
                  <span>마감일 | {project.recruitmentPeriod}</span>
                  <Tag>
                    {project.position.map((ps, index) => (
                      <Range key={index}>{ps}</Range>
                    ))}
                  </Tag>
                </TagBox>
                <Stack>
                  {project.techStack.map((stack, index) => (
                    <span key={index}>{stack}</span>
                  ))}
                </Stack>
              </Detail>
              <Title>{project.title}</Title>
              <User>
                <UserDetail>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                  </svg>
                  <span>{project.username}</span>
                </UserDetail>
                <ProjectDetail>
                  <span>조회 수 {project.view}</span>
                  <span>댓글 수 {project.totalCommentsAndReplies}</span>
                </ProjectDetail>
              </User>
            </Project>
          </Link>
        ))}
      </ProjectBox>
      <ListPagenation
        limit={size}
        page={startPage}
        setPage={setStartPage}
        blockNum={blockNum}
        setBlockNum={setBlockNum}
        counts={counts}
      />
    </>
  );
}

export default ProjectList;
