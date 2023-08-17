import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import CommentSection from "./CommentSection";

import "../Account/account.css";

const PostDetails = () => {
  const { allPosts, isLoading } = useSelector((state) => state.timeline);

  const { id } = useParams();
  const navigate = useNavigate();
  const post = allPosts?.find((item) => id && item._id === id);

  const handleOpenCreatedBy = () => {
    navigate(
      `/profile?firstName=${post.firstName}&lastName=${post.lastName}&creator=${post.creator}`
    );
  };
  if (!post) return null;

  if (isLoading) {
    return (
      <div className="account-loader-container">
        <div
          style={{
            marginTop: "15rem",
          }}
          className="account-custom-loader"
        ></div>
      </div>
    );
  }

  // const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <div
      style={{
        marginTop: "4rem",
      }}
      key={post._id}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div
          style={{
            borderRadius: "20px",
            margin: "10px",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", gap: "1rem", padding: "0.6rem" }}>
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

            <div onClick={handleOpenCreatedBy} style={{ fontSize: "1.3rem" }}>
              {`${post.firstName} ${post.lastName}`}
            </div>
          </div>
          <Divider style={{ margin: "10px 0" }} />

          <div>{post.message}</div>
          <Divider style={{ margin: "10px 0" }} />

          <div>{moment(post.createdAt).fromNow()}</div>

          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
