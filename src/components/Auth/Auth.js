import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  createTheme,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FileBase from "react-file-base64";

// import Icon from "./icon";
import { signin, signup } from "../../actions/auth";
// import { AUTH } from "../../constants/actionTypes";
import InputAuth from "./InputAuth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  profilePics: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createTheme();
  const { loading, isUserError } = useSelector((state) => state.authReducer);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  // SWITCHMODE
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  // HANDLESUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup & !form.profilePics) {
      return setError(true);
    } else if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };

  // googlelogin useEffect
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_LOGIN,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  //  GOOGLESUCCESS
  // const googleSuccess = async (res) => {
  //   console.log(res);
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: AUTH, data: { result, token } });

  //     history.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // GOOGLE ERROR

  // const googleError = () =>
  //   console.log("Google Sign In was unsuccessful. Try again later");

  // HANDLECHANGE
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
        elevation={6}
      >
        <h2>{isUserError && isUserError.message}</h2>
        <h2>{error && "Select profile Picture"}</h2>

        {loading ? (
          <CircularProgress />
        ) : (
          <Avatar
            sx={{
              margin: 1,
              backgroundColor: isSignup ? "blue" : "green",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
        )}

        {/* SIGNUP OR SIGN IN FORM TOGGLER */}
        <Typography component="h1" variant="h5">
          {isSignup ? "Create a new account " : "Log in to mabench"}
        </Typography>
        <form
          style={{
            width: "100%",
            marginTop: theme.spacing(3),
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <InputAuth
                  name="firstName"
                  label="First Name"
                  onChange={handleChange}
                  autoFocus
                  half
                />
                <InputAuth
                  name="lastName"
                  label="Last Name"
                  onChange={handleChange}
                  half
                />
              </>
            )}

            {/* EMAIL INPUTHAUTH */}
            <InputAuth
              name="email"
              label="Email Address"
              onChange={handleChange}
              type="email"
            />

            {/* PASWORD INPUTHAUTH */}
            <InputAuth
              name="password"
              label="Password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {/* CONFIRMATION INPUTHAUTH nd wil only show if ur in d signup form */}
            {isSignup && (
              <InputAuth
                name="confirmPassword"
                label="Repeat Password"
                onChange={handleChange}
                type="password"
              />
            )}
            {isSignup && (
              <span style={{ marginTop: "1rem" }}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setForm({ ...form, profilePics: base64 })
                  }
                />
              </span>
            )}
          </Grid>

          {/* BUTTON  */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              margin: theme.spacing(3, 0, 2),
              marginTop: theme.spacing(3),
              backgroundColor: isSignup ? "blue" : "green",
            }}
          >
            {isSignup ? "Sign Up" : "Log In"}
          </Button>

          {/* GOOGLElOGIN, sign it with google  */}
          {/* <googleLogin
            clientId={process.env.REACT_APP_GOOGLE_LOGIN}
            render={(renderProps) => (
              <Button
                sx={{
                  background: "green",
                  marginTop: "0.7rem",
                  marginBottom: "1rem",
                }}
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          /> */}

          {/* GRID/BUTTON with SWITCHMODE, either singup or signin  */}
          <Grid container justify="flex-end">
            <Grid item>
              <Button sx={{ textTransform: "capitalize" }} onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
