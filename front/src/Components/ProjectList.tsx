import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ListPagenation from "./Paging";
import React from "react";
import StackMapping from "./StackMapping";

const ProjectBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: ". . .";
  grid-auto-rows: minmax(0, 1fr);
  row-gap: 5rem;
  column-gap: 1.875rem;
  margin: 2rem 10% 4rem 10%;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 18.75rem;
  border: 3px solid #c2dedc;
  border-radius: 3.125rem;
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
  background-color: #7d92e9;
  padding: 0.438rem 0.5rem;
  font-size: 0.5rem;
  color: white;
  margin-right: 0.5rem;
  border-radius: 1.25rem;
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

const StackImage = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: 2px solid #7d92e9;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 7.5rem;
  border-radius: 0.8rem;
  color: white;
  line-height: 50px;
  padding: 0.625rem;
  font-weight: 600;
  font-size: 1.563rem;
  text-align: center;
  border: 3px solid whitesmoke;
  background-color: #9580c9;
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setProjects(projectss);
    console.log(projectss);
    setCounts(projectss.length);
    console.log(projectss.length);
  }, [projectss]);

  return (
    <>
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
