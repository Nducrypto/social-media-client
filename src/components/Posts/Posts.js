import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import Post from "./Post/Post";

const Posts = ({ setCurrentId, search }) => {
  const { posts, isLoading } = useSelector((state) => state.allPosts);

  if (!posts?.length && !isLoading) return "No posts";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
      {posts
        ?.sort((a, b) => (a._id > b._id ? -1 : +1))
        .map((post) => (
          <Grid key={post._id} item xs={10} sm={10} md={8} lg={8}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
    </Grid>
  );
};

export default Posts;
