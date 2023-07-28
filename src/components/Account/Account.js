import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser, changePassword } from "../../actions/auth";

import FileBase from "react-file-base64";

import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import CustomizedSnackbar from "../SnackBar/SnackBar";
import "./account.css";
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

  const userId = user?.result?._id;
  console.log(userId);
  const dispatch = useDispatch();

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
    <div className="container">
      <CustomizedSnackbar message="Password Changed Successfully" />
      {loading || change_pass_loading ? (
        <div className="account-loader-container">
          <div className="account-custom-loader"></div>
        </div>
      ) : null}
      {/* Form */}
      <div className="form-container">
        <div className="form-wrapper">
          {/* Input fields */}
          <input
            type="text"
            className="input-field"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="email"
            className="input-field"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <textarea
            className="input-field textarea"
            rows="4"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <div className="file-input-wrapper">
            <label className="file-input-label">
              <FileBase
                className="file-input"
                type="file"
                multiple={false}
                onDone={({ base64 }) => setProfilePics(base64)}
              />
            </label>
          </div>

          {/* Submit button */}
          {!loading && (
            <button
              className="submit-button"
              disabled={loading}
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
          {isUserError}
          {/* Change Password */}
          <div className="change-password-label">Change Password</div>
          <div className="error-message">
            {" "}
            {error && "Please Fill All The fields"}
          </div>
          <input
            className="password-input"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => {
              setError(false);
              setOldPassword(e.target.value);
              dispatch({ type: "NO_ERROR" });
            }}
          />
          <input
            className="password-input"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              dispatch({ type: "NO_ERROR" });
              setError(false);
            }}
          />
          <input
            className="password-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              dispatch({ type: "NO_ERROR" });
              setError(false);
            }}
          />
          {!change_pass_loading && (
            <button className="submit-button" onClick={handleChangePassword}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
