import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";

import { useDispatch } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { likePost, deletePost } from "../../../actions/posts";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = user?.result.googleId || user?.result?._id;

  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

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
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
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

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
      }}
      raised
      elevation={7}
    >
      <div
        component="span"
        name="test"
        style={{
          display: "block",
          textAlign: "initial",
        }}
        onClick={openPost}
      >
        <CardMedia
          sx={{
            height: 0,
            paddingTop: "56.25%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "darken",
          }}
          image={post.selectedFile}
          title={post.title}
        />
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "white",
          }}
        >
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "white",
            }}
            name="edit"
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              sx={{ color: "white" }}
              size="small"
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
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          sx={{ padding: "0 16px" }}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </div>
      <CardActions
        sx={{
          padding: "0 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {user?.result ? (
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleLike}
          >
            <span
              style={{
                "&:hover": {
                  transitionDelay: "1",
                  transform: "scale(1.2)",
                  color: "blue",
                },
              }}
            >
              <Likes />
            </span>

            {/* comment button in like button  */}
            <Button onClick={openPost}>
              <MapsUgcIcon
                sx={{
                  "&:hover": {
                    transitionDelay: "1",
                    transform: "scale(1.2)",
                    color: "blue",
                  },
                }}
              />
            </Button>
          </Button>
        ) : null}
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
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
            />{" "}
            &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
