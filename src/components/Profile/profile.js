import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Post from "../Posts/Post/Post";
import { Box } from "@mui/system";
import { getUser, follow } from "../../actions/auth";
import "./profile.css";
import { Following } from "../../Utils/Following";
import { useStateContext } from "../../context/ContextProvider";

const Profile = () => {
  const { loggedInUser } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, allUsers } = useSelector((state) => state.authReducer);
  const { allPosts, isLoading } = useSelector((state) => state.timeline);

  const { profilePics, followers, firstName, email, lastName } = profile;

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const {
    result: { _id: loggedInUserId },
  } = loggedInUser;

  const creator = useQuery().get("creator");

  const profileposts = allPosts?.filter((item) =>
    item.creator.includes(creator)
  );
  function handleFollow() {
    dispatch(follow(creator, { followerId: loggedInUserId }));
  }

  useEffect(() => {
    if (creator) {
      dispatch(getUser(creator));
    }
  }, [creator, dispatch]);

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
              src={profilePics}
              alt={firstName?.charAt(0)}
            />
          </div>
          email
          <p style={{ fontSize: "0.9rem" }}>{email} </p>
          <p>
            {firstName} {lastName}{" "}
          </p>
          <div>
            {" "}
            {followers?.length}{" "}
            {followers?.length > 1 ? "followers" : "follower"}
          </div>
          <div>
            <Following allUsers={allUsers} creator={creator} /> following{" "}
          </div>
        </div>

        <div>
          {" "}
          {creator !== loggedInUserId ? (
            <Button
              onClick={handleFollow}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "1rem",
              }}
            >
              {followers?.includes(loggedInUserId) ? "Unfollow" : "Follow"}
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
          {!profileposts.length && !isLoading ? (
            <div>No Post</div>
          ) : (
            profileposts?.map((post) => (
              <Grid key={post._id} item xs={10} sm={8} md={8} lg={7}>
                <>
                  <Post post={post} />
                </>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </div>
  );
};

export default Profile;
