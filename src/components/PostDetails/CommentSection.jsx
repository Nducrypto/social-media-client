import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";
import "./comment.css";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const [active, setActive] = useState(false);
  const [replyComment, setReplyComment] = useState("");
  const [parentCommentId, setParentCommentId] = useState(""); // State to store the parentCommentId
  const [parentReplyId, setParentReplyId] = useState(""); // State to store the parentCommentId

  const dispatch = useDispatch();

  const handleComment = () => {
    dispatch(
      commentPost(post._id, {
        firstName: user?.result?.firstName,
        lastName: user?.result?.lastName,
        comment: comment || replyComment,
        parentCommentId: parentCommentId || null,
        parentReplyId: parentReplyId || null,
      })
    );

    setComment("");
    setParentCommentId(null);
    setParentReplyId("");
    setReplyComment("");
    setActive(false);
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
          <button onClick={handleComment} className="comment-button">
            Comment
          </button>
        )}
      </div>

      {/* Display comments and reply button */}
      <div className="comments-container">
        {post.comments
          ?.map((comment) => (
            <div key={comment._id} className="comments">
              <div
                className="div-click"
                onClick={() => {
                  setParentCommentId(comment._id);
                  setActive((prev) => !prev);
                }}
              >
                <p>{comment.author}</p>
                <p>{comment.text}</p>
              </div>

              {parentCommentId === comment._id && active && (
                <div>
                  <div className="comment-input-container">
                    <input
                      onChange={(e) => setReplyComment(e.target.value)}
                      placeholder="Reply to the comment..."
                      className="comment-input"
                    />
                    {replyComment && (
                      <button
                        className="comment-button"
                        onClick={handleComment}
                      >
                        Reply
                      </button>
                    )}
                  </div>
                </div>
              )}
              {comment?.replies
                ?.map((reply) => (
                  <div key={reply._id} className="replies">
                    <div
                      className="div-click"
                      onClick={() => {
                        setParentReplyId((prev) =>
                          prev === reply._id ? "" : reply._id
                        );
                        setParentCommentId(comment._id);
                      }}
                    >
                      <p>{reply.author}</p>

                      <p>{reply.text}</p>
                    </div>

                    {parentReplyId === reply._id && (
                      <div>
                        <div className="comment-input-container">
                          <input
                            onChange={(e) => setReplyComment(e.target.value)}
                            placeholder="Reply to the comment..."
                            className="comment-input"
                          />
                          {replyComment && (
                            <button
                              className="comment-button"
                              onClick={handleComment}
                            >
                              Repl
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    <p>
                      {reply.subReply
                        .map((sub, index) => (
                          <div key={index} className="subReplies">
                            <div>{reply.author}</div>

                            <div>{sub?.text}</div>
                          </div>
                        ))
                        .reverse()}
                    </p>
                  </div>
                ))
                .reverse()}
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
};
export default CommentSection;
