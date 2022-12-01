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
import { getUser, updateUser, changePassword } from "../../actions/auth";
import InputAuth from "../Auth/InputAuth";
import FileBase from "react-file-base64";
import Post from "../Posts/Post/Post";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePics, setProfilePics] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [editProfile, setEditProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));
  const id = user?.result?._id;
  const dispatch = useDispatch();
  const theme = createTheme();
  const navigate = useNavigate();
  const { posts, isLoading } = useSelector((state) => state.allPosts);

  const filterPost = posts.filter((p) => p.creator === id);

  const { loading } = useSelector((state) => state.authReducer);

  useEffect(() => {
    JSON.parse(localStorage.getItem("profile"));
    dispatch(getUser(id));
  }, [dispatch, id]);

  // === HANDLEUPDATEUSER
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
        navigate
      )
    );
    setBio("");
    setFirstName("");
    setLastName("");
    setProfilePics("");
  };

  //  =====HANDLECHANGEPASSWORD
  const handleChangePassword = () => {
    dispatch(
      changePassword(id, {
        oldPassword,
        password,
      })
    );
    setPassword("");
    setOldPassword("");
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
          <div>
            <div>
              <img
                style={{ height: "4rem", borderRadius: "4rem" }}
                src={user?.result.profilePics}
                alt=""
              />
            </div>
            <Typography
              sx={{
                fontSize: "1.5rem",
              }}
            >{`${user?.result.firstName} ${user?.result.lastName}`}</Typography>
            <Typography
              sx={{
                fontSize: "1.3rem",
              }}
            >
              {user?.result.email}
            </Typography>
            <Typography sx={{ textAlign: "center", fontSize: "1.7rem" }}>
              {user?.result.bio}
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
                    <div>Change Password</div>
                    <div style={{ marginRight: "3rem" }}>
                      <InputAuth
                        label="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <InputAuth
                        label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <Button
                        style={{ marginTop: "1rem" }}
                        variant="contained"
                        onClick={handleChangePassword}
                      >
                        submit
                      </Button>
                    </div>
                  </Grid>
                </Paper>
              )}
            </Container>
          </div>
        )}
      </div>

      {/* =====USER POST */}
      <div style={{ marginTop: "4rem" }}>
        {!filterPost.length && !isLoading ? (
          <div style={{ fontSize: "2rem", textAlign: "center" }}>
            No Post Created By You
          </div>
        ) : isLoading ? (
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
