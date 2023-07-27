import {
  Container,
  Paper,
  Grid,
  createTheme,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser, changePassword } from "../../actions/auth";
import InputAuth from "../Auth/InputAuth";
import FileBase from "react-file-base64";

import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import CustomizedSnackbar from "../SnackBar/SnackBar";

const Account = () => {
  const [error, setError] = useState(false);
  const { setSnackBarOpen } = useStateContext();

  const user = JSON.parse(localStorage.getItem("profile"));
  const [firstName, setFirstName] = useState(
    user?.result.firstName ? user?.result.firstName : ""
  );
  const [lastName, setLastName] = useState(
    user?.result.lastName ? user?.result.lastName : ""
  );
  const [bio, setBio] = useState("");
  const [profilePics, setProfilePics] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editProfile, setEditProfile] = useState(false);

  const userId = user?.result?._id;
  const dispatch = useDispatch();
  const theme = createTheme();
  const navigate = useNavigate();

  const { loading, isUserError, change_pass_loading } = useSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    JSON.parse(localStorage.getItem("profile"));
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  // === HANDLEUPDATEUSER
  const handleSubmit = () => {
    dispatch(
      updateUser(
        userId,
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
  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!password || !oldPassword || !confirmPassword) {
      setError(true);
    } else {
      dispatch(
        changePassword(
          userId,
          {
            oldPassword,
            password,
            confirmPassword,
          },

          setSnackBarOpen
        )
      );
    }
  };

  return (
    <div>
      <CustomizedSnackbar message="Password Changed Successfully" />
      <Button
        onClick={() => setEditProfile((prev) => !prev)}
        variant="contained"
        sx={{
          textTransform: "capitalize",
          borderRadius: "1rem",
        }}
      >
        {editProfile ? "cancel" : "edit Profile"}
      </Button>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <div style={{ padding: "0 1rem 0 1rem" }}>
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
                  <Grid item xs={12} sm={12} md={12}>
                    <input
                      style={{
                        width: "100%",
                        height: "3rem",
                        fontSize: "1.3rem",
                        borderRadius: "1rem",
                      }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <input
                      style={{
                        width: "100%",
                        height: "3rem",
                        fontSize: "1.3rem",
                        borderRadius: "1rem",
                      }}
                      type="email"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <textarea
                      style={{
                        width: "100%",
                        color: "black",

                        fontSize: "1.3rem",
                        borderRadius: "1rem",
                      }}
                      rows={4}
                      placeholder="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </Grid>

                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setProfilePics(base64)}
                  />

                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      fullWidth
                      size="small"
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      style={{
                        margin: theme.spacing(3, 0, 2),
                        marginTop: theme.spacing(3),
                      }}
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      submit
                    </Button>
                  )}

                  <div>Change Password</div>
                  <div style={{ marginRight: "3rem" }}>
                    <div
                      style={{
                        marginTop: isUserError ? "1rem" : "",
                        marginBottom: isUserError ? "0.5rem" : "",
                      }}
                    >
                      {isUserError}
                    </div>
                    <div
                      style={{
                        marginTop: isUserError ? "1rem" : "",
                        marginBottom: isUserError ? "0.5rem" : "",
                      }}
                    >
                      {error && "Please Fill All The fields"}
                    </div>
                    <div style={{ marginBottom: "0.7rem" }}>
                      <InputAuth
                        // required
                        label="OldPassword"
                        value={oldPassword}
                        onChange={(e) => {
                          setError(false);
                          setOldPassword(e.target.value);
                          dispatch({ type: "NO_ERROR" });
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "0.7rem" }}>
                      <InputAuth
                        required
                        label="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          dispatch({ type: "NO_ERROR" });
                          setError(false);
                        }}
                      />
                    </div>

                    <InputAuth
                      required
                      label="ConfirmPassword"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        dispatch({ type: "NO_ERROR" });
                        setError(false);
                      }}
                    />
                    {change_pass_loading ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        style={{ marginTop: "1rem" }}
                        variant="contained"
                        onClick={handleChangePassword}
                      >
                        submit
                      </Button>
                    )}
                  </div>
                </Grid>
              </Paper>
            )}
          </Container>
        </div>
      </Box>
    </div>
  );
};

export default Account;
