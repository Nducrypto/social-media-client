import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

import { commentPost, deleteComment } from "../../actions/posts";
import "./comment.css";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");

  const [replyComment, setReplyComment] = useState({});

  const [parentCommentId, setParentCommentId] = useState("");

  const dispatch = useDispatch();

  //  recursive function to display comments
  const handleDisplay = (comments) => {
    return (
      <div className="comments-container">
        {comments?.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <button
                onClick={() =>
                  dispatch(deleteComment(post._id, { commentId: comment._id }))
                }
                className="delete-comment"
              >
                <DeleteIcon
                  fontSize="small"
                  style={{ cursor: "pointer", color: "darkRed" }}
                />
              </button>
              <p
                className="author"
                onClick={() => {
                  setParentCommentId(comment._id);
                }}
              >
                {comment.userName}
                <span style={{ fontSize: "1rem" }}>
                  {" "}
                  {comment.comments.length} reply
                </span>
              </p>
              <div
                className="comment-text"
                onClick={() => {
                  setParentCommentId(comment._id);
                }}
              >
                <p>{comment.text}</p>
              </div>
            </div>
            {parentCommentId === comment._id && (
              <div className="comment-input-container">
                <input
                  value={replyComment[comment._id] || ""}
                  onChange={(e) => {
                    setReplyComment((prevStates) => ({
                      ...prevStates,
                      [comment._id]: e.target.value,
                    }));
                  }}
                  placeholder="Reply to the comment..."
                  className="comment-input"
                />
                <button
                  className="comment-button"
                  onClick={() => {
                    handleComment(replyComment[comment._id]);
                  }}
                >
                  Reply
                </button>
              </div>
            )}
            {handleDisplay(comment.comments)}
          </div>
        ))}
      </div>
    );
  };

  const handleComment = (replyComment) => {
    console.log(replyComment);
    dispatch(
      commentPost(post._id, {
        firstName: user?.result?.firstName,
        lastName: user?.result?.lastName,
        comment: comment || replyComment,
        parentCommentId: parentCommentId || null,
      })
    );

    setComment("");
    setParentCommentId(null);
    setReplyComment({});
  };

  return (
    <div>
      <div className="comment-input-container">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="comment-input"
        />
        {comment && (
          <button
            onClick={() => handleComment(null)}
            className="comment-button"
          >
            Comment
          </button>
        )}
      </div>
      {/* Display comments and reply */}

      {handleDisplay(post.comments)}
    </div>
  );
};
export default CommentSection;
