import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Divider,
  createTheme,
  LinearProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { getPost } from "../../actions/posts";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { post, isLoading } = useSelector((state) => state.allPosts);
  const dispatch = useDispatch();
  const theme = createTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [id, dispatch]);

  // ====LINEAR PROGRESS=====
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  // ==== END OF LINEAR PROGRESS==

  const handleOpenCreatedBy = () => {
    navigate(
      `/profile?firstName=${post.firstName}&lastName=${post.lastName}&creator=${post.creator}`
    );
  };
  if (!post) return null;

  if (isLoading) {
    return (
      <Paper
        elevation={6}
        sx={{
          marginTop: "6rem",
        }}
      >
        <LinearProgress
          sx={{
            height: ".5rem",
          }}
          variant="determinate"
          value={progress}
        />
      </Paper>
    );
  }

  // const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper
      style={{
        marginTop: "6rem",
        padding: "20px",
        borderRadius: "15px",
      }}
      elevation={6}
      key={post._id}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          [theme.breakpoints.down("sm")]: {
            flexWrap: "wrap",
            flexDirection: "column",
          },
        }}
      >
        <div
          style={{
            borderRadius: "20px",
            margin: "10px",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <img
                src={post?.profilePics}
                style={{
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  background: "grey",
                }}
                alt={post?.firstName?.charAt(0)}
              />
            </div>

            <Typography variant="h6">
              <div onClick={handleOpenCreatedBy}>
                {`${post.firstName} ${post.lastName}`}
              </div>
            </Typography>
          </div>
          <Divider style={{ margin: "10px 0" }} />

          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Divider style={{ margin: "10px 0" }} />

          <div>{moment(post.createdAt).fromNow()}</div>

          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
      </div>
    </Paper>
  );
};

export default PostDetails;
