import { Link, useParams, useHistory } from "react-router-dom";
import Header from "../Components/Header";
import styled from "styled-components";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import SideNav from "../Components/SideNav";
import { Writer } from "../Components/HandleUser";
import { useSelector } from "react-redux";
import { RootState } from "../_reducers";

const Wrapper = styled.div`
  display: flex;
  background-color: #f8f9fa;
`;

const BigContainer = styled.div`
  width: 70%;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  margin: 50px 8% 100px 3%;
  padding: 3%;
  background-color: white;
  border: 2px solid #dadce0;
  border-radius: 10px;
  input.miniinput {
    width: 90%;
  }
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 30px;
  font-size: 35px;
  font-weight: 600;
`;

const User = styled.div`
  width: auto;
  height: auto;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  div {
    margin-right: 20px;
  }
`;
const WriterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DetailList = styled.div`
  border-top: 3px solid #f2f2f2;
  margin-top: 20px;
  padding-top: 30px;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 3rem;
`;

const Detail = styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;
  font-weight: 600;
  overflow: hidden;
  h1 {
    margin-right: 10px;
    opacity: 0.5;
    width: 100px;
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
      padding: 0.313rem 5px;
      font-size: 11px;
      border-radius: 5px;
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
  margin-top: 50px;
  padding-top: 100px;
  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 50px;
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
  button {
    margin-left: 1.25rem;
    background-color: #f1f2f3;
    border-radius: 5px;
    border: 0;
    color: #586672;

    font-weight: 600;
    padding: 0.313rem 1.25rem;
    cursor: pointer;
    &:hover {
      background-color: #ecedee;
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
  margin-top: 20px;
  width: 100%;
  padding: 6.25rem 0px 0px 0px;
  border-top: 3px solid #f2f2f2;
  display: flex;
  flex-direction: column;
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 20px;
  div:first-child {
    margin-bottom: 30px;
  }
  span:last-child {
    margin-left: 1.25rem;
  }
  input {
    border: none;
    outline: none;
    width: 90%;
    height: 100%;
  }
  button {
    background-color: #ecedee;
    border: 0;
    height: 100%;
    padding: 0.5rem 20px;
    font-weight: 600;
    border-radius: 10px;
    &:hover {
      background-color: #e2e4e9;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 120px;
  padding: 10px;
  margin-top: 1.875rem;
  border-radius: 10px;
  border: 0.125rem solid rgba(0, 0, 0, 0.2);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;
  padding: 15px 0px;
  div:first-child {
    margin-bottom: 10px;
    opacity: 0.5;
  }
`;

const RecentProject = styled.div`
  display: flex;
  position: sticky;
  top: 130px;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  width: 350px;
  height: 400px;
  border: 2px solid #dadce0;
  border-radius: 10px;
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
  interface Comment {
    username: string;
    id: number;
    userId: number;
    content: string;
    replyInfos: Reple[];
  }
  interface Reple {
    username: string;
    id: number;
    userId: number;
    content: string;
  }

  const [project, setProject] = useState<Project | null>(null);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isrepleMode, setIsRepleMode] = useState(false);
  const [isrepleEditMode, setIsRepleEditMode] = useState(false);

  const [editedContent, setEditedContent] = useState("");
  const [repleContent, setRepleContent] = useState("");

  const postId = useParams().projectId;
  const history = useHistory();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user ? user.id : null;
  const accessToken = localStorage.getItem("accessToken");

  const projects = useSelector(
    (state: RootState) => state.userReducer.projects
  );
  console.log(projects);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await axios.get(
          `http://localhost:8080/api/v1/posts/${postId}`
        );
        const projectData = postRes.data.data;
        setProject(projectData);

        const commentRes = await axios.get(
          `http://localhost:8080/api/v1/posts/${postId}/comments`
        );
        setComments(commentRes.data.data);
        console.log(comments);
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
    const confirmed = window.confirm("모집을 마감하시겠습니까?");
    if (confirmed) {
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
    }
  };

  const deletePostBtn = (event) => {
    event.preventDefault();
    const confirmed = window.confirm("모집 글을 삭제하시겠습니까?");
    if (confirmed) {
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
    }
  };

  const contentChange = (event) => {
    setContent(event.target.value);
  };

  const createComment = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:8080/api/v1/posts/${postId}/comments`,
      params: { content },
      headers: config.headers,
    })
      .then(async (res) => {
        const commentRes = await axios.get(
          `http://localhost:8080/api/v1/posts/${postId}/comments`
        );
        setComments(commentRes.data.data);

        setContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editCommentClick = (editContent) => {
    setIsEditMode(true);
    setIsRepleMode(false);
    setIsRepleEditMode(false);
    setEditedContent(editContent);
  };
  const exitEditClick = () => {
    setIsEditMode(false);
  };
  const repleClick = () => {
    setIsRepleMode((prevState) => !prevState);
    setIsEditMode(false);
    setIsRepleEditMode(false);
  };
  const editRepleClick = (editReple) => {
    setIsRepleEditMode((prevState) => !prevState);
    setIsRepleMode(false);
    setIsEditMode(false);
    setEditedContent(editReple);
  };
  const handleCommentClick = (commentId) => {
    setSelectedCommentId(commentId);
    console.log(commentId);
  };

  const editContentChange = (event) => {
    setEditedContent(event.target.value);
  };
  const repleContentChange = (event) => {
    setRepleContent(event.target.value);
  };

  const editComment = (commentId) => {
    const confirmed = window.confirm("댓글을 수정하시겠습니까?");
    if (confirmed) {
      axios({
        method: "patch",
        url: `http://localhost:8080/api/v1/posts/${postId}/comments/${commentId}`,
        params: { content: editedContent },
        headers: config.headers,
      }).then(async (res) => {
        const commentRes = await axios.get(
          `http://localhost:8080/api/v1/posts/${postId}/comments`
        );
        setComments(commentRes.data.data);
        setEditedContent("");
        setIsEditMode(false);
      });
    }
  };
  const editReple = (replyId) => {
    const confirmed = window.confirm("답글을 수정하시겠습니까?");
    if (confirmed) {
      axios({
        method: "patch",
        url: `http://localhost:8080/api/v1/posts/${postId}/comments/replies/${replyId}`,
        params: { content: editedContent },
        headers: config.headers,
      })
        .then(async (res) => {
          const commentRes = await axios.get(
            `http://localhost:8080/api/v1/posts/${postId}/comments`
          );
          setComments(commentRes.data.data);
          setEditedContent("");
          setIsRepleEditMode(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteComment = (commentId) => {
    const confirmed = window.confirm("댓글을 삭제하시겠습니까?");
    if (confirmed) {
      axios({
        method: "delete",
        url: `http://localhost:8080/api/v1/posts/${postId}/comments/${commentId}`,
        headers: config.headers,
      }).then(async (res) => {
        const commentRes = await axios.get(
          `http://localhost:8080/api/v1/posts/${postId}/comments`
        );
        setComments(commentRes.data.data);
        const ex = commentRes.data.data.find(
          (comment) => comment.id === commentId
        );
        console.log(ex);
        setContent("");
      });
    }
  };

  const deleteReple = (repleId) => {
    const confirmed = window.confirm("답글을 삭제하시겠습니까?");
    if (confirmed) {
      axios({
        method: "delete",
        url: `http://localhost:8080/api/v1/posts/${postId}/comments/replies/${repleId}`,
        headers: config.headers,
      }).then(async (res) => {
        const commentRes = await axios.get(
          `http://localhost:8080/api/v1/posts/${postId}/comments`
        );
        setComments(commentRes.data.data);
        setContent("");
        console.log(res);
      });
    }
  };

  const createReple = (commentId) => {
    axios({
      method: "post",
      url: `http://localhost:8080/api/v1/posts/${postId}/comments/${commentId}/replies`,
      params: { content: repleContent },
      headers: config.headers,
    }).then(async (res) => {
      const commentRes = await axios.get(
        `http://localhost:8080/api/v1/posts/${postId}/comments`
      );
      setComments(commentRes.data.data);
      setEditedContent("");
      setIsRepleMode(false);
    });
  };
  return (
    <>
      <Header />
      <Wrapper>
        <SideNav />
        <BigContainer>
          <Container>
            <Title>{project?.title}</Title>
            <WriterBox>
              <User>
                <Writer>{project?.username[0]}</Writer>
                <span>
                  {project?.username}
                  {/* {project?.date}  //timestamp 가져오기}  */}
                </span>
              </User>
              {project?.userId === user.data.id ? (
                <BtnDiv>
                  <button
                    onClick={completeBtn}
                    className="submit"
                    type="submit"
                  >
                    마감
                  </button>
                  <Link to={`${postId}/editProject`}>
                    <button>수정</button>
                  </Link>
                  <button
                    onClick={deletePostBtn}
                    className="submit"
                    type="submit"
                  >
                    삭제
                  </button>
                </BtnDiv>
              ) : (
                <></>
              )}
            </WriterBox>

            <DetailList>
              <Detail>
                <h1>마감일</h1>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
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
              <Comments>
                {comments.map((comment) => (
                  <CommentBox key={comment.id}>
                    <div
                      onClick={() => handleCommentClick(comment.id)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FontAwesomeIcon
                          icon={faCircleUser}
                          style={{
                            color: "#1361e7",
                            marginRight: "10px",
                          }}
                        />
                        <div>{comment?.username}</div>
                      </div>
                      {user.data.id === comment.userId ? (
                        <div style={{ fontSize: "14px" }}>
                          {isrepleMode && comment.id === selectedCommentId ? (
                            <span
                              onClick={() => repleClick()}
                              style={{ cursor: "pointer", marginRight: "20px" }}
                            >
                              취소
                            </span>
                          ) : (
                            <span
                              onClick={() => repleClick()}
                              style={{ cursor: "pointer", marginRight: "20px" }}
                            >
                              답글 쓰기
                            </span>
                          )}
                          {isEditMode && comment.id === selectedCommentId ? (
                            <span
                              onClick={exitEditClick}
                              style={{ cursor: "pointer" }}
                            >
                              취소
                            </span>
                          ) : (
                            <span
                              onClick={() => editCommentClick(comment.content)}
                              style={{ cursor: "pointer" }}
                            >
                              수정
                            </span>
                          )}
                          <span
                            onClick={() => deleteComment(comment.id)}
                            style={{ cursor: "pointer" }}
                          >
                            삭제
                          </span>
                        </div>
                      ) : (
                        <div style={{ fontSize: "14px" }}>
                          <span
                            onClick={() => repleClick()}
                            style={{ cursor: "pointer" }}
                          >
                            답글 쓰기
                          </span>
                        </div>
                      )}
                    </div>
                    <div>{comment.content}</div>
                    {comment.replyInfos.map((reple) => (
                      <Comments>
                        <CommentBox
                          style={{
                            marginLeft: "50px",
                            opacity: "1",
                            borderTop: "1px solid  rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div
                            onClick={() => handleCommentClick(reple.id)}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <FontAwesomeIcon
                                icon={faCircleUser}
                                style={{
                                  color: "#1361e7",
                                  marginRight: "10px",
                                }}
                              />
                              <div>{reple.username}</div>
                            </div>

                            {user.data.id === reple.userId ? (
                              <div style={{ fontSize: "14px" }}>
                                {isEditMode &&
                                reple.id === selectedCommentId ? (
                                  <span style={{ cursor: "pointer" }}>
                                    취소
                                  </span>
                                ) : (
                                  <span
                                    onClick={() =>
                                      editRepleClick(reple.content)
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    수정
                                  </span>
                                )}
                                <span
                                  onClick={() => deleteReple(reple.id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  삭제
                                </span>
                              </div>
                            ) : null}
                          </div>
                          <div>{reple.content}</div>
                          {isrepleEditMode && reple.id === selectedCommentId ? (
                            <Content
                              onClick={() => handleCommentClick(reple.id)}
                              key={reple.id}
                              style={{ marginLeft: "50px" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  height: "100%",
                                  justifyContent: "space-between",
                                }}
                              >
                                <input
                                  onChange={editContentChange}
                                  value={editedContent}
                                  type="text"
                                />
                                <button
                                  onClick={() => editReple(reple.id)}
                                  style={{ cursor: "pointer" }}
                                  type="submit"
                                >
                                  수정
                                </button>
                              </div>
                            </Content>
                          ) : null}
                        </CommentBox>
                      </Comments>
                    ))}
                    {isrepleMode && comment.id === selectedCommentId ? (
                      <Content
                        onClick={() => handleCommentClick(comment.id)}
                        key={comment.id}
                        style={{ marginLeft: "50px" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            height: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <input
                            onChange={repleContentChange}
                            value={repleContent}
                            type="text"
                            className="miniinput"
                          />
                          <button
                            onClick={() => createReple(comment.id)}
                            style={{ cursor: "pointer" }}
                            type="submit"
                          >
                            답글
                          </button>
                        </div>
                      </Content>
                    ) : null}

                    {isEditMode && comment.id === selectedCommentId ? (
                      <Content>
                        <div
                          style={{
                            display: "flex",
                            height: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <input
                            onChange={editContentChange}
                            value={editedContent}
                            type="text"
                          />
                          <button
                            onClick={() => editComment(comment.id)}
                            style={{ cursor: "pointer" }}
                            type="submit"
                          >
                            수정
                          </button>
                        </div>
                      </Content>
                    ) : null}
                  </CommentBox>
                ))}
              </Comments>

              <Content>
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <input
                    placeholder="댓글을 입력하세요"
                    onChange={contentChange}
                    value={content}
                    type="text"
                  />
                  <button
                    onClick={createComment}
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    등록
                  </button>
                </div>
              </Content>
            </Comment>
          </Container>
          {/* <RecentProject>
            <h1>최근에 올라온 모집 글</h1>
            {projects.map((project) => (<>
              <span>{project.username}</span>
              </>
            ))}
          </RecentProject> */}
        </BigContainer>
      </Wrapper>
    </>
  );
}
{
  /* <Link key={project.id} to={`/${project.id}`}></Link> */
}

export default Project;
