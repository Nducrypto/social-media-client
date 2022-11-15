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
import { useHistory } from "react-router-dom";

import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  //=== this is for updating of post
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();
  const theme = createTheme();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      history.push("/");
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
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
          <Typography variant="h6">
            Join mabench and connect with new friends.
          </Typography>
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        padding: theme.spacing(1),
        borderRadius: "0 2rem",
        backgroundColor: "#fffafa",
        marginBottom: "2rem",
        [theme.breakpoints.down("sm")]: {
          position: "relative",
        },
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
        <Typography variant="h6">
          {currentId ? "Editing... " : "Create Something..."}
        </Typography>
        <TextField
          style={{ backgroundColor: "white" }}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          style={{ backgroundColor: "white" }}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <div
          style={{
            width: "97%",
            margin: "10px 0",
          }}
        >
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          sx={{
            width: "80%",
          }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          POST
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
