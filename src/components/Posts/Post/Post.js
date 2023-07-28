import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { likePost, deletePost } from "../../../actions/posts";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./post.css";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = user?.result?._id;
  const isAdmin = user?.result?.isAdmin;

  const handleLike = async () => {
    // check if user has liked
    const hasLikedPost = likes.indexOf(userId);
    if (hasLikedPost === -1) {
      likes.push(userId);
    } else {
      likes.splice(hasLikedPost, 1);
    }
    setLikes([...likes]);
    dispatch(likePost(post._id, { userId }));
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.includes(userId) ? (
        <>
          <FavoriteIcon fontSize="medium" />
          &nbsp;
          {likes.length >= 2 ? (
            <span style={{ fontSize: "0.8rem" }}>
              {` You and ${likes.length - 1} Other${
                likes.length <= 2 ? "" : "s"
              }`}
            </span>
          ) : (
            `${likes.length} like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <FavoriteBorderIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "" : ""}
        </>
      );
    }

    return <FavoriteBorderIcon fontSize="small" />;
  };

  const viewProfile = () => {
    navigate(
      `/profile?firstName=${post.firstName}&lastName=${post.lastName}&creator=${post.creator}`
    );
  };

  const openPost = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <main className="tweets">
      <div className="tweet">
        <div className="tweet-content">
          <article className="user-info">
            <img onClick={viewProfile} src={post.profilePics} alt="" />
            <div>
              <strong>{`${post.firstName} ${post.lastName}`} </strong>
              <span className="moment">
                {moment(post.createdAt).fromNow(true)}
              </span>
            </div>
            <div className="article-wrapper">
              {user?.result?._id === post?.creator || isAdmin ? (
                <MoreHorizIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentId(post._id);
                  }}
                  fontSize="default"
                />
              ) : null}
            </div>
          </article>
          <div onClick={openPost} className="message-container">
            <p>{post.message}</p>

            <img className="uploaded-image" src={post.selectedFile} alt="" />
          </div>
        </div>
        <article className="tweet-actions">
          {user?.result && (
            <span>
              <button onClick={handleLike} disabled={!user?.result}>
                <Likes />
              </button>
            </span>
          )}
          <span onClick={openPost}>{post?.comments?.length} Comments</span>
          <span>
            {user?.result?._id === post?.creator || isAdmin ? (
              <DeleteIcon
                style={{ cursor: "pointer", color: "red" }}
                fontSize="small"
                onClick={() => dispatch(deletePost(post._id))}
              />
            ) : null}
          </span>
        </article>
      </div>
    </main>
  );
};

export default Post;
