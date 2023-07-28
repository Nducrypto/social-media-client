import React from "react";
import { useSelector } from "react-redux";
import "./Post/post.css";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state?.allPosts);

  if (!posts?.length && !isLoading) return "No posts";

  return isLoading ? (
    <div style={{ textAlign: "center", marginTop: "8rem" }}>
      <div className="post-loader-container">
        <div className="post-custom-loader"></div>
      </div>
    </div>
  ) : (
    <div>
      {posts
        ?.sort((a, b) => (a._id > b._id ? -1 : +1))
        .map((post) => (
          <div key={post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </div>
        ))}
    </div>
  );
};

export default Posts;
