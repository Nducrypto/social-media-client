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
import { useParams, useHistory } from "react-router-dom";

import { getPost } from "../../actions/posts";
import CommentSection from "./CommentSection";

const Post = () => {
  const { post, isLoading } = useSelector((state) => state.allPosts);
  const dispatch = useDispatch();
  const theme = createTheme();
  const { id } = useParams();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result._id;
  useEffect(() => {
    dispatch(getPost(id));
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
    if (post.creator === userId) {
      history.push("/account");
    } else {
      history.push(`/profile`, { post: post });
    }
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
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">
            Created by:
            <button
              onClick={handleOpenCreatedBy}
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              {`${post.firstName} ${post.lastName}`}
            </button>
          </Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div
          style={{
            marginLeft: "20px",
            [theme.breakpoints.down("sm")]: {
              marginLeft: 0,
            },
          }}
        >
          <img
            style={{
              borderRadius: "20px",
              objectFit: "cover",
              width: "100%",
              maxHeight: "600px",
            }}
            src={post.selectedFile}
            alt=""
          />
        </div>
      </div>
    </Paper>
  );
};

export default Post;
