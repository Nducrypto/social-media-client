import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Post from "../Posts/Post/Post";
import { getPostsByCreator } from "../../actions/posts";
import { Box } from "@mui/system";

const Profile = () => {
  const dispatch = useDispatch();
  const { profileposts, isLoading } = useSelector((state) => state.allPosts);

  const location = useLocation();
  const post = location.state.post;
  useEffect(() => {
    dispatch(getPostsByCreator(post.creator));
  }, [dispatch, post]);

  if (!profileposts.length && !isLoading) return "No posts";

  return (
    <div>
      <Box
        sx={{
          textAlign: "center",
          marginTop: { xs: "5rem", sm: "4rem", md: "1rem" },
        }}
      >
        <Typography variant="h4">
          {post.firstName} {post.lastName}{" "}
        </Typography>
        <div
          style={{
            height: "6rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              borderRadius: "50%",
              width: 90,
              height: 90,
              background: "red",
            }}
            src={post.profilePics}
            alt={post.firstName}
          />
        </div>
      </Box>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "13rem",
          }}
        >
          <CircularProgress size="4rem" />
        </div>
      ) : (
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          {profileposts?.map((post) => (
            <Grid key={post._id} item xs={10} sm={8} md={8} lg={7}>
              <>
                <Post post={post} />
              </>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Profile;
