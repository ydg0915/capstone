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
  faFire,
} from "@fortawesome/free-solid-svg-icons";

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
  margin: 2rem 5% 4rem 5%;
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

function ProjectList({ projectss }) {
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
  const [size, setSize] = useState(15);
  const [startPage, setStartPage] = useState(1);
  const [counts, setCounts] = useState(0);
  const [blockNum, setBlockNum] = useState(0);
  useEffect(() => {
    setProjects(projectss);
    setCounts(projectss.length);
  }, [projectss]);
  console.log(projects);
  return (
    <>
      <ProjectString>
        <span>프로젝트 찾기</span>

        <FontAwesomeIcon
          icon={faBoltLightning}
          style={{ color: "yellowgreen", marginLeft: "10px" }}
        />
      </ProjectString>
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
