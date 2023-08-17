import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { likePost, deletePost } from "../../../actions/posts";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./post.css";
import { Tooltip } from "@mui/material";
import { follow } from "../../../actions/auth";
import { useStateContext } from "../../../context/ContextProvider";

const Post = ({ post, setCurrentId }) => {
  const { loggedInUser } = useStateContext();
  const [likes, setLikes] = useState(post?.likes);
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = loggedInUser?.result?._id;
  const isAdmin = loggedInUser?.result?.isAdmin;

  const handleLike = async () => {
    const hasLikedPost = likes.indexOf(userId);
    if (hasLikedPost === -1) {
      likes.push(userId);
    } else {
      likes.splice(hasLikedPost, 1);
    }
    setLikes([...likes]);
    dispatch(likePost(post._id, { userId }));
  };

  function handleFollow(creator) {
    dispatch(follow(creator, { followerId: loggedInUser?.result?._id }));
  }

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
    <main>
      <div className="tweets">
        <div className="tweet">
          <div className="tweet-content">
            <article className="user-info">
              <img onClick={viewProfile} src={post.profilePics} alt="" />
              <div>
                <strong>
                  {`${post.firstName} ${post.lastName} `}{" "}
                  {post.isAdmin && (
                    <VerifiedUserIcon
                      sx={{ fontSize: "1rem", color: "blue" }}
                    />
                  )}
                </strong>
                <span className="moment">
                  {moment(post.createdAt).fromNow(true)}
                </span>
              </div>
              <div className="article-wrapper">
                <MoreHorizIcon
                  onClick={() => {
                    setActive((prev) => (prev === post._id ? "" : post._id));
                  }}
                  fontSize="default"
                />

                {active === post._id && (
                  <div className="popup-info">
                    {post?.creator !== loggedInUser?.result._id && (
                      <button>
                        <Tooltip title="follow" placement="right-start">
                          <PersonAddIcon
                            onClick={() => {
                              handleFollow(post?.creator);
                              setActive("");
                            }}
                          />
                        </Tooltip>
                      </button>
                    )}

                    {loggedInUser?.result?._id === post?.creator || isAdmin ? (
                      <button>
                        <Tooltip title="edit" placement="right-start">
                          <EditIcon
                            sx={{ fontSize: "1rem", color: "blue" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentId(post._id);
                              setActive("");
                            }}
                          />
                        </Tooltip>
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </article>
            <div onClick={openPost} className="message-container">
              <p>{post.message}</p>

              <img className="uploaded-image" src={post.selectedFile} alt="" />
            </div>
          </div>
          <article className="tweet-actions">
            {loggedInUser?.result && (
              <span>
                <button onClick={handleLike} disabled={!loggedInUser?.result}>
                  <Likes />
                </button>
              </span>
            )}
            <span onClick={openPost}>{post?.comments?.length} Comments</span>
            <span>
              {loggedInUser?.result?._id === post?.creator || isAdmin ? (
                <DeleteIcon
                  style={{ cursor: "pointer", color: "red" }}
                  fontSize="small"
                  onClick={() => dispatch(deletePost(post._id))}
                />
              ) : null}
            </span>
          </article>
        </div>
      </div>
    </main>
  );
};

export default Post;
