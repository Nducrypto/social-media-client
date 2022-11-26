import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  createTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { createPost, updatePost } from "../../actions/posts";
import { Container } from "@mui/system";

const Form = ({ currentId, setCurrentId, clicked, setClicked }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const profilePics = user?.result?.profilePics;
  const lastName = user?.result?.lastName;
  const firstName = user?.result?.firstName;

  const [postData, setPostData] = useState({
    message: "",
    selectedFile: "",
  });
  const creator = user?.result?._id;

  const { posts } = useSelector((state) => state.allPosts);

  //=== this is for updating of post
  const editPost = posts.find((p) => (currentId ? p._id === currentId : null));

  const dispatch = useDispatch();
  const theme = createTheme();

  const clear = () => {
    setCurrentId(0);
    setPostData({
      message: "",
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (currentId) setPostData(editPost);
  }, [editPost, currentId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createPost({ ...postData, profilePics, firstName, lastName, creator })
      );
      clear();
    } else {
      dispatch(
        updatePost(currentId, {
          ...postData,
          profilePics,
          firstName,
          lastName,
          creator,
        })
      );
      clear();
    }
  };

  if (!user?.result) {
    return (
      <Paper
        sx={{
          padding: theme.spacing(1),
          borderRadius: "0 2rem",
          backgroundColor: "#fffafa",
          position: "sticky",
          [theme.breakpoints.down("sm")]: {
            position: "relative",
          },
        }}
        elevation={6}
      >
        <Typography variant="h3" align="center">
          Happening now.
          <Typography>Join mabench and connect with new friends.</Typography>
        </Typography>
      </Paper>
    );
  }

  return (
    <div
      style={{
        padding: theme.spacing(1),
        borderRadius: "0 2rem",

        // backgroundColor: "red",
        // backgroundColor: "#fffafa",
      }}
      elevation={6}
    >
      <form
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? "Editing... " : null}</Typography>
        <Container style={{ display: "flex", gap: ".4rem" }}>
          <img
            style={{
              height: "3rem",
              width: "3rem",
              borderRadius: "3rem",
              marginTop: ".3rem",
              marginLeft: "-2rem",
            }}
            src={user?.result.profilePics}
            alt=""
          />
          <TextField
            sx={{ backgroundColor: "white" }}
            name="message"
            variant="outlined"
            label="Post..."
            fullWidth
            multiline
            rows={clicked ? 4 : 1}
            value={postData.message}
            onClick={() => setClicked(true)}
            onChange={(e) => {
              setPostData({ ...postData, message: e.target.value });
            }}
          />
        </Container>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "97%",
            marginTop: "0.3rem",
          }}
        >
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />

          <Button
            sx={{
              width: "10%",
              height: "70%",
            }}
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            fullWidth
            onClick={() => setClicked(false)}
          >
            POST
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
