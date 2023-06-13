import { Link, useParams, useHistory } from "react-router-dom";
import Header from "../Components/Header";
import { styled } from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 6.25rem 15rem 12.5rem 15rem;
`;

const Title = styled.div`
  width: 100%;
  height: 6.25rem;
  font-size: 3.125rem;
  font-weight: 600;
`;

const Writer = styled.div`
  width: auto;
  height: auto;
  font-size: 1.563rem;
  display: flex;
  align-items: center;
  justify-content: start;
  svg {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1.25rem;
  }
`;

const DetailList = styled.div`
  margin-top: 6.25rem;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 5rem;
`;

const Detail = styled.div`
  display: flex;
  font-size: 1.875rem;
  align-items: center;
  font-weight: 600;
  h1 {
    margin-right: 1.875rem;
    opacity: 0.5;
  }
  span {
    display: flex;
    align-items: center;
    margin-right: 1.25rem;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      padding: 0.313rem 0.625rem;
      font-size: 1rem;
      border-radius: 0.938rem;
      background-color: #7d92e9;
      color: white;
      margin-right: 0.938rem;
    }
  }
  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 1.25rem;
  }
`;

const Description = styled.div`
  width: 100%;
  margin-top: 6.25rem;
  border-top: 0.125rem solid rgba(0, 0, 0, 0.2);
  padding: 6.25rem 0px 0px 0px;
  h1 {
    font-size: 2.188rem;
    font-weight: 600;
    margin-bottom: 1.875rem;
  }
  span {
    font-size: 1.25rem;
    font-family: "Roboto", sans-serif;
    line-height: 3em;
    font-weight: 600;
  }
`;
const BtnDiv = styled.form`
  display: flex;
  justify-content: end;
  margin-top: 50px;
  button {
    margin-left: 1.25rem;
    background-color: teal;
    border-radius: 0.938rem;
    border: 0;
    color: white;
    font-weight: 600;
    padding: 0.313rem 1.25rem;
    cursor: pointer;
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

const Comment = styled.section`
  margin-top: 6.25rem;
  width: 100%;
  padding: 6.25rem 0px 0px 0px;
  border-top: 0.125rem solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 1.875rem;
  span:last-child {
    margin-left: 1.25rem;
  }
  input {
    width: 100%;
    height: 12.5rem;
    margin-top: 1.875rem;
    border-radius: 0.938rem;
    border: 0.125rem solid rgba(0, 0, 0, 0.2);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  button {
    background-color: #7d92e9;
    border: 0;
    padding: 0.5rem 0.938rem;
    color: white;
    font-weight: 600;
    border-radius: 1.25rem;
    float: right;
    margin-top: 1.25rem;
  }
`;

function Project() {
  interface Project {
    id: number;
    position: string[];
    recruitmentPeriod: string;
    techStack: string[];
    title: string;
    recruitmentSize: number;
    expectedDuration: number;
    content: string;
    totalCommentsAndReplies: number;
    userId: number;
    username: string;
    view: number;
  }
  interface User {
    username: string;
    email: string;
    id: number;
    introduction: string;
  }

  const [project, setProject] = useState<Project | null>(null);
  const postId = useParams().projectId;
  const history = useHistory();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user ? user.id : null;
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/posts/${postId}`,
          {
            params: {
              postId: postId,
            },
          }
        );
        const projectData = res.data.data;
        setProject(projectData);
        console.log(projectData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const completeBtn = (event) => {
    event.preventDefault();
    axios
      .patch(
        `http://localhost:8080/api/v1/posts/${postId}/complete`,
        postId,
        config
      )
      .then((res) => {
        console.log(res.data);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePostBtn = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:8080/api/v1/posts/${postId}`, {
        params: {
          postId: postId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <Container>
        <Title>{project?.title}</Title>
        <Writer>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
          </svg>
          <span>
            {project?.username}
            {/* {project?.date}  //timestamp 가져오기}  */}
          </span>
        </Writer>
        <BtnDiv>
          <button onClick={completeBtn} className="submit" type="submit">
            마감
          </button>
          <Link to={`${postId}/editProject`}>
            <button>수정</button>
          </Link>
          <button onClick={deletePostBtn} className="submit" type="submit">
            삭제
          </button>
        </BtnDiv>
        <DetailList>
          <Detail>
            <h1>마감 일</h1>
            <span> {project?.recruitmentPeriod}</span>
          </Detail>
          <Detail>
            <h1>모집 분야</h1>
            <ul>
              {project?.position.map((position, index) => (
                <li key={index}>{position}</li>
              ))}
            </ul>
          </Detail>
          <Detail>
            <h1>사용 스택</h1>
            <span>
              {project?.techStack.map((stack, index) => (
                <span key={index}>{stack}</span>
              ))}
            </span>
          </Detail>
          <Detail>
            <h1>연락 방법</h1>
            <span>
              1대1 채팅{" "}
              <Link to={"/chat"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </Link>
            </span>
          </Detail>
        </DetailList>
        <Description>
          <h1>프로젝트 소개</h1>
          <span>{project?.content}</span>
        </Description>
        <Comment>
          <div>
            <span>댓글</span>
            <span>{project?.totalCommentsAndReplies} Comment</span>
          </div>
          <form>
            <input />
            <button>댓글 등록</button>
          </form>
        </Comment>
      </Container>
    </>
  );
}

export default Project;
