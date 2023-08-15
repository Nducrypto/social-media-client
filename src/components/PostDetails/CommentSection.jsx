import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { commentPost, deleteComment } from "../../actions/posts";
import "./comment.css";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");

  const [replyComment, setReplyComment] = useState({});

  const [parentCommentId, setParentCommentId] = useState("");

  const dispatch = useDispatch();

  const firstName = user?.result?.firstName;
  const lastName = user?.result?.lastName;
  const userId = user?.result._id;
  const isAdmin = user?.result.isAdmin;
  console.log(isAdmin);
  //  recursive function to display comments
  const displayComments = (comments) => {
    return (
      <div className="comments-container">
        {comments?.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <div className="comment-header-left">
                <p className="author">
                  {comment.userName}
                  {""}
                  {comment.isAdmin && (
                    <VerifiedUserIcon
                      sx={{ fontSize: "1rem", color: "blue" }}
                    />
                  )}
                </p>
                <span className="num-replies">
                  {comment.comments.length} replies
                </span>
              </div>
              {comment.userId === user.result._id && (
                <button
                  onClick={() =>
                    dispatch(
                      deleteComment(post._id, { commentId: comment._id })
                    )
                  }
                  className="delete-comment"
                >
                  <DeleteIcon
                    fontSize="small"
                    style={{ cursor: "pointer", color: "darkRed" }}
                  />
                </button>
              )}
            </div>
            <div className="comment-text">
              <p>{comment.text}</p>
              <div className="like-reply-section">
                {/* <button className="like-button">Like</button> */}
                <button
                  className="reply-button"
                  onClick={() => setParentCommentId(comment._id)}
                >
                  Reply
                </button>
              </div>
            </div>
            {parentCommentId === comment._id && (
              <div className="comment-input-container">
                <input
                  value={replyComment[comment._id] || ""}
                  onChange={(e) =>
                    setReplyComment((prevStates) => ({
                      ...prevStates,
                      [comment._id]: e.target.value,
                    }))
                  }
                  placeholder="Reply to the comment..."
                  className="comment-input"
                />
                {replyComment[comment._id] && (
                  <button
                    className="comment-button"
                    onClick={() => {
                      handleComment(replyComment[comment._id]);
                    }}
                  >
                    Reply
                  </button>
                )}
              </div>
            )}
            {displayComments(comment.comments)}
          </div>
        ))}
      </div>
    );
  };

  const handleComment = (replyComment) => {
    console.log(replyComment);
    dispatch(
      commentPost(post._id, {
        firstName,
        lastName,
        userId,
        isAdmin,
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

      {displayComments(post.comments)}
    </div>
  );
};
export default CommentSection;
