import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import React from "react";

import { Content } from "../routes/Project";

const Comment = ({
  comment,
  selectedCommentId,
  onSelectComment,
  onSaveComment,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const commentId = comment.id;
  const postId = useParams().projectId;
  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleEditClick = () => {
    if (comment.id === selectedCommentId) {
      setIsEditMode(true);
    }
  };

  const handleSaveClick = () => {
    axios({
      method: "post",
      url: `http://localhost:8080/api/v1/posts/${postId}/comments/${commentId}`,
      params: { content: editedContent },
      headers: config.headers,
    });
    setIsEditMode(false);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  return (
    <div>
      {isEditMode && comment.id === selectedCommentId ? (
        <Content></Content>
      ) : (
        <div>{comment.content}</div>
      )}

      {comment.id === selectedCommentId ? (
        isEditMode ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )
      ) : null}
    </div>
  );
};
export default Comment;
