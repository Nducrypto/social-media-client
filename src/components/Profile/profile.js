import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Post from "../Posts/Post/Post";
import { getPostsByCreator } from "../../actions/posts";

const Profile = () => {
  // const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  const { profileposts, isLoading } = useSelector((state) => state.allPosts);

  const location = useLocation();
  const creator = location.state.creator;
  console.log(creator);
  useEffect(() => {
    dispatch(getPostsByCreator(creator));
  }, [dispatch, creator]);

  if (!profileposts.length && !isLoading) return "No posts";

  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          marginTop: { xs: "5rem", sm: "4rem", md: "1rem" },
        }}
      >
        {/* {<img src={posts?.[0].profilePics} />} */}
        {/* <div>{user?.result.firstName}</div>
        <img style={{ height: "3rem" }} src={post.profilePics} /> */}
      </Paper>
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
            <Grid key={post._id} item xs={10} sm={10} md={7} lg={7}>
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
