import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { likePost, deletePost } from "../../../actions/posts";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = user?.result?._id;
  const isAdmin = user?.result?.isAdmin;

  const hasLikedPost = post.likes.find((like) => like === userId);
  // const token = user?.result._id;

  const handleLike = async () => {
    dispatch(likePost(post._id, { userId }));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <FavoriteIcon fontSize="medium" />
          &nbsp;
          {likes.length > 2 ? (
            <span style={{ fontSize: "0.8rem", textTransform: "capitalize" }}>
              You and {likes.length - 1} others
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

    return (
      <>
        <FavoriteBorderIcon fontSize="small" />
        {/* &nbsp;like */}
      </>
    );
  };
  const handleProfile = () => {
    if (post.creator === userId) {
      navigate("/account");
    } else {
      navigate(`/${post.firstName}${post.lastName}`, {
        state: {
          post: post,
        },
      });
    }
  };

  const openPost = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <Card
      sx={{
        marginTop: "1.3rem",
        // height: "28rem",
      }}
      raised
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img src={post.profilePics} alt="hell" onClick={handleProfile} />
          </Avatar>
        }
        action={
          <>
            {user?.result?._id === post.creator && (
              <Tooltip title="edit">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentId(post._id);
                  }}
                >
                  <MoreHorizIcon
                    fontSize="default"
                    sx={{
                      "&:hover": {
                        transitionDelay: "1",
                        transform: "scale(1.7)",
                      },
                    }}
                  />
                </Button>
              </Tooltip>
            )}
          </>
        }
        title={`${post.firstName} ${post.lastName}`}
        subheader={moment(post.createdAt).fromNow()}
      />

      <div onClick={openPost}>
        {/* <div> */}
        <CardContent sx={{ marginTop: "-1rem" }}>
          <Typography variant="body2">
            {post.message}
            {/* {post.message.split(" ").splice(0, 20).join(" ")}... */}
          </Typography>
        </CardContent>
        {/* </div> */}
        <CardMedia
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "darken",
            height: { xs: "15rem", md: "25rem", lg: "35rem", sm: "26rem" },
          }}
          component="img"
          image={post.selectedFile}
          alt=""
        />
      </div>
      <CardActions
        sx={{
          padding: "0 0px 0px 0px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          {user?.result && (
            <Button
              size="small"
              color="primary"
              disabled={!user?.result}
              onClick={handleLike}
              sx={{
                "&:hover": {
                  transitionDelay: "1",
                  transform: "scale(1.2)",
                  color: "blue",
                },
              }}
            >
              <Likes />
            </Button>
          )}
          {user?.result && (
            <Tooltip title="comment">
              <Button
                sx={{ textTransform: "lowerCase" }}
                size="small"
                onClick={openPost}
              >
                <MapsUgcIcon
                  sx={{
                    "&:hover": {
                      transitionDelay: "1",
                      transform: "scale(1.2)",
                      color: "blue",
                    },
                  }}
                />
                comment
              </Button>
            </Tooltip>
          )}
        </div>
        {user?.result?._id === post?.creator || isAdmin ? (
          <Button
            sx={{ textTransform: "lowerCase" }}
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon
              sx={{
                "&:hover": {
                  transitionDelay: "1",
                  transform: "scale(1.2)",
                  color: "blue",
                },
              }}
              fontSize="small"
            />
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Post;
