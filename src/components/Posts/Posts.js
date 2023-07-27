import React from "react";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state?.allPosts);

  if (!posts?.length && !isLoading) return "No posts";

  return isLoading ? (
    <div style={{ textAlign: "center", marginTop: "8rem" }}>
      <CircularProgress size="4rem" />
    </div>
  ) : (
    <div>
      {posts
        ?.sort((a, b) => (a._id > b._id ? -1 : +1))
        .map((post) => (
          <Post post={post} setCurrentId={setCurrentId} />
        ))}
    </div>
  );
};

export default Posts;
