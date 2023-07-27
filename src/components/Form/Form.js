import React, { useState, useEffect } from "react";
import { Typography, Paper, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";

import { useNavigate } from "react-router-dom";
import "./form.css";
const Form = ({ currentId }) => {
  const [postData, setPostData] = useState({
    message: "",
    selectedFile: "",
  });
  const [inputHeight, setInputHeight] = useState(48);

  const user = JSON.parse(localStorage.getItem("profile"));
  const profilePics = user?.result?.profilePics;
  const lastName = user?.result?.lastName;
  const firstName = user?.result?.firstName;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const creator = user?.result?._id;

  const { posts } = useSelector((state) => state.allPosts);

  //=== this is for updating of post
  const editPost = posts.find((p) => currentId && p._id === currentId);

  const theme = createTheme();

  useEffect(() => {
    if (currentId) setPostData(editPost);
  }, [editPost, currentId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createPost({ ...postData, profilePics, firstName, lastName, creator })
      );
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
    }
    setPostData({
      message: "",
      selectedFile: "",
    });
  };

  const handleInputChange = (e) => {
    setInputHeight(e.target.scrollHeight);
  };

  //  ===== Select image by converting to base64 ,String =====
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Use reader.result, which contains the base64-encoded string
      const base64String = reader.result;
      setPostData({ ...postData, selectedFile: base64String });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  console.log(handleFileChange);
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
    <div>
      <div className="tweet-input-container">
        <img
          src={user?.result.profilePics}
          alt=""
          onClick={() =>
            navigate(
              `/profile?firstName=${user?.result?.firstName}&lastName=${user?.result?.lastName}&creator=${creator}`
            )
          }
          className="profile-pic"
        />

        <textarea
          className="tweet-input"
          placeholder="What's happening?"
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
            handleInputChange(e);
          }}
          style={{ height: inputHeight }}
        />
      </div>
      <div className="upload-button-image-container">
        <label className="upload-button" htmlFor="fileInput">
          Upload
          <span role="img" aria-label="camera" style={{ marginLeft: "6px" }}>
            📷
          </span>
        </label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <button className="post-button" onClick={handleSubmit}>
          Tweet
        </button>
      </div>
      {postData.selectedFile && (
        <img src={postData.selectedFile} alt="" className="small-image" />
      )}
    </div>
  );
};

export default Form;
