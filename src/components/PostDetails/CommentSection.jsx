import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user?.result?.name}: ${comment}`, post._id)
    );

    setComment("");
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {user?.result ? (
        <div
          style={{
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              What's on your mind?
            </Typography>
            <TextField
              fullWidth
              rows={5}
              variant="outlined"
              label="Write a"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
          <div
            style={{
              height: "200px",
              overflowY: "auto",
              marginRight: "30px",
            }}
          >
            <Typography gutterBottom variant="h6">
              Comments
            </Typography>
            {comments?.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong style={{ marginRight: "2rem" }}>
                  {c.split(": ")[0]}
                </strong>
                {c.split(":")[1]}
              </Typography>
            ))}
            <div ref={commentsRef} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CommentSection;
