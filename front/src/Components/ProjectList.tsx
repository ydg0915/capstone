import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ListPagenation from "./Paging";
import React from "react";
import StackMapping from "./StackMapping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faComment,
  faEye,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

const ProjectString = styled.div`
  padding: 0px 5%;
  font-size: 25px;
  font-weight: 600;
  span {
    margin-right: 5px;
  }
`;

const ProjectBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: ". . .";
  grid-auto-rows: minmax(0, 1fr);
  row-gap: 5rem;
  column-gap: 1.875rem;
  margin: 3% 2% 3% 2%;
`;
const Box = styled.div`
  display: flex;
  margin-top: 40px;
  width: 100%;
  justify-content: space-between;
  padding-right: 5%;
`;

const SearchForm = styled.div`
  display: flex;
  width: 20%;
  height: 2.5rem;
  padding: 0px 2%;
  border: 0.125rem solid #1361e7;
  outline: none;
  border-radius: 3.125rem;
  align-items: center;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background-color: inherit;
  &::placeholder {
    font-size: 0.75rem;
    color: black;
    opacity: 0.5;
    font-weight: 600;
  }
`;
const SearchBtn = styled.button`
  border: none;
  outline: none;

  background-color: rgba(0, 0, 0, 0);
  font-size: 1rem;
  opacity: 0.5;
  cursor: pointer;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 18.75rem;
  border: 3px solid #c2dedc;
  border-radius: 15px;
  background-color: white;
  padding: 1.3em;
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
  background-color: #a0f1d0;
  padding: 6px 0.5rem;
  font-size: 8px;
  color: rgba(0, 0, 0, 1);
  font-weight: 600;
  margin-right: 0.5rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:last-child {
    margin-right: 0px;
  }
`;

const Stack = styled.div`
  display: flex;
  width: auto;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 7.5rem;
  border-radius: 0.8rem;
  color: rgba(0, 0, 0, 1);
  line-height: 50px;
  padding: 0.625rem;
  font-weight: 600;
  font-size: 1.563rem;
  text-align: center;
`;
const Writer = styled.div`
  width: 1.563rem;
  height: 1.563rem;
  margin-right: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 14px;
  border-radius: 50%;
  background-color: #a0f1d0;
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.125rem;
  border-top: 0.063rem solid #c2dedc;
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
  align-items: center;
  line-height: 50px;
  line-height: 1.5;
  span {
    margin-right: 0.625rem;
    vertical-align: middle;
  }
`;
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

interface ProjectListProps {
  projectss: Project[];
  onSearch?: (searchResults: any) => void;
}

function ProjectList({ projectss, onSearch }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [size, setSize] = useState(15);
  const [startPage, setStartPage] = useState(1);
  const [counts, setCounts] = useState(0);
  const [searchContent, setSearchContent] = useState("");
  const [blockNum, setBlockNum] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (projectss.length >= 2 && projectss[0].id < projectss[1].id) {
      setProjects([...projectss].reverse());
    } else {
      console.log(projects);
      setProjects(projectss);
      setCounts(projectss.length);
    }
    setLoading(false);
  }, [projectss]);

  useEffect(() => {
    const delay = 500;

    const timer = setTimeout(() => {
      if (onSearch) {
        axios({
          method: "get",
          url: `http://localhost:8080/api/v1/posts/search`,
          params: { query: searchContent },
        })
          .then((res) => {
            const searchData = res.data.data;
            onSearch(searchData);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [searchContent]);

  const searchChange = (event) => {
    setSearchContent(event.target.value);
  };

  return (
    <>
      <Box>
        <ProjectString>
          <span>프로젝트 찾기</span>

          <FontAwesomeIcon
            icon={faBoltLightning}
            style={{ color: "yellowgreen", marginLeft: "10px" }}
          />
        </ProjectString>

        <SearchForm>
          <SearchInput
            onChange={searchChange}
            value={searchContent}
            type="text"
            placeholder="검색"
          ></SearchInput>
          <SearchBtn>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </SearchBtn>
        </SearchForm>
      </Box>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
                      <StackMapping key={index} stack={stack} />
                    ))}
                  </Stack>
                </Detail>
                <Title>{project.title}</Title>
                <User>
                  <UserDetail>
                    <Writer>{project.username[0]}</Writer>
                    <span>{project.username}</span>
                  </UserDetail>
                  <ProjectDetail>
                    <span>
                      <FontAwesomeIcon icon={faEye} /> {project.view}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faComment} />{" "}
                      {project.totalCommentsAndReplies}
                    </span>
                  </ProjectDetail>
                </User>
              </Project>
            </Link>
          ))}
        </ProjectBox>
      )}
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
