import {
  Typography,
  Container,
  Paper,
  Grid,
  createTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser } from "../../actions/auth";
import InputAuth from "../Auth/InputAuth";
import FileBase from "react-file-base64";
import Post from "../Posts/Post/Post";
import { useHistory } from "react-router-dom";

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePics, setProfilePics] = useState("");
  const [editProfile, setEditProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));
  const id = user?.result?._id;
  const dispatch = useDispatch();
  const theme = createTheme();
  const history = useHistory();

  const { posts, isLoading } = useSelector((state) => state.allPosts);
  const filterPost = posts.filter((p) => p.creator === id);

  const { singleUser, loading } = useSelector((state) => state.authReducer);
  useEffect(() => {
    JSON.parse(localStorage.getItem("profile"));
    dispatch(getUser(id));
  }, [dispatch, id]);

  const handleSubmit = () => {
    dispatch(
      updateUser(
        id,
        {
          bio: bio,
          firstName,
          lastName,
          profilePics,
        },
        history
      )
    );
    setBio("");
    setFirstName("");
    setLastName("");
    setProfilePics("");
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <div>
        {!editProfile ? (
          <Button
            onClick={() => setEditProfile(true)}
            variant="contained"
            sx={{
              float: "right",
              textTransform: "capitalize",
              borderRadius: "1rem",
            }}
          >
            edit Profile
          </Button>
        ) : (
          <Button
            onClick={() => setEditProfile(false)}
            variant="contained"
            sx={{
              float: "right",
              textTransform: "capitalize",
              borderRadius: "1rem",
            }}
          >
            cancel
          </Button>
        )}
        {loading ? (
          <CircularProgress />
        ) : (
          singleUser?.map((p) => (
            <div key={p._id}>
              <div>
                <img
                  style={{ height: "4rem", borderRadius: "4rem" }}
                  src={p.profilePics}
                  alt=""
                />
              </div>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                }}
              >{`${p.firstName} ${p.lastName}`}</Typography>
              <Typography
                sx={{
                  fontSize: "1.3rem",
                }}
              >
                {p.email}
              </Typography>
              <Typography sx={{ textAlign: "center", fontSize: "1.7rem" }}>
                {p.bio}
              </Typography>

              <Container component="main" maxWidth="xs">
                {editProfile && (
                  <Paper
                    elevation={6}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: theme.spacing(2),
                      marginTop: "1rem",
                    }}
                  >
                    <Grid container spacing={2}>
                      {user?.result && (
                        <>
                          <InputAuth
                            label="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          <InputAuth
                            label="lastName"
                            type="email"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </>
                      )}
                      <InputAuth
                        multiline
                        rows={4}
                        label="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setProfilePics(base64)}
                      />

                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{
                          margin: theme.spacing(3, 0, 2),
                          marginTop: theme.spacing(3),
                        }}
                        onClick={() => {
                          handleSubmit();
                          setEditProfile(false);
                        }}
                      >
                        submit
                      </Button>
                    </Grid>
                  </Paper>
                )}
              </Container>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: "4rem" }}>
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
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            {filterPost?.map((post) => (
              <Grid key={post._id} item xs={10} sm={10} md={8} lg={8}>
                <Post post={post} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Account;
