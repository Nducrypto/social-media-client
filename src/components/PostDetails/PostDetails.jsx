import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  createTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";

const Post = () => {
  const { post, isLoading } = useSelector((state) => state.allPosts);
  const dispatch = useDispatch();
  const theme = createTheme();
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  // useEffect(() => {
  //   if (post) {
  //     dispatch(
  //       getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
  //     );
  //   }
  // }, [post, dispatch]);

  if (!post) return null;

  // const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "15px",
          height: "39vh",
          marginTop: "6rem",
        }}
      >
        <CircularProgress size="7em" />
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
              onClick={() =>
                history.push(`/profile`, { creator: post.creator })
              }
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
