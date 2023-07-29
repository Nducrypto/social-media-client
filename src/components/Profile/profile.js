import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Post from "../Posts/Post/Post";
import { Box } from "@mui/system";
import { getUser, follow } from "../../actions/auth";
import "./profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const { posts, isLoading } = useSelector((state) => state.allPosts);

  const { singleUser } = useSelector((state) => state.authReducer);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  // used this to make query request
  const creator = useQuery().get("creator");

  const profileposts = posts?.filter((item) => item.creator.includes(creator));

  useEffect(() => {
    dispatch(getUser(creator));
  }, [creator, dispatch]);

  function handleFollow() {
    dispatch(follow(creator, { followerId: user?.result?._id }));
  }
  if (!profileposts.length && !isLoading) return "No posts";

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 0.5rem 0 0.5rem",
          marginTop: { xs: "5rem", sm: "4rem", md: "1rem" },
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              style={{
                borderRadius: "50%",
                width: 90,
                height: 90,
                background: "grey",
              }}
              src={singleUser?.profilePics}
              alt={singleUser?.firstName?.charAt(0)}
            />
          </div>
          <p style={{ fontSize: "0.9rem" }}>{singleUser?.email} </p>
          <p>
            {singleUser?.firstName} {singleUser?.lastName}{" "}
          </p>
          <div>
            {" "}
            {singleUser?.followers?.length}{" "}
            {singleUser?.followers?.length > 1 ? "followers" : "follower"}
          </div>
        </div>

        <div>
          {" "}
          {creator !== user?.result._id ? (
            <Button
              onClick={handleFollow}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "1rem",
              }}
            >
              follow
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/account")}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "1rem",
              }}
            >
              edit Profile
            </Button>
          )}
        </div>
      </Box>

      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5rem",
          }}
        >
          <div className="profile-custom-loader"></div>
        </div>
      ) : (
        <Grid
          sx={{ mt: "2rem" }}
          container
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
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
