import { AUTH } from "../constants/actionTypes";

import * as api from "../api/index.js";

//   SIGNIN
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_START" });
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    dispatch({ type: "LOADING_END" });
    navigate("/");
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
  }
};

//  SIGNUP
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_START" });

    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    dispatch({ type: "LOADING_END" });

    navigate("/");
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();

    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (err) {
    dispatch({ type: "IS_USER_ERROR", payload: err.response.data.message });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUser(id);
    dispatch({ type: "FETCH_USER_BY_ID", payload: data });
  } catch (err) {
    dispatch({ type: "IS_USER_ERROR", payload: err.response.data.message });
  }
};

export const updateUser = (id, update, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_START" });

    const { data } = await api.updateUser(id, update);

    dispatch({ type: "UPDATE_USER", data });

    dispatch({ type: "LOADING_END" });
    navigate("/");
  } catch (err) {
    dispatch({ type: "IS_USER_ERROR", payload: err.response.data.message });
  }
};
export const changePassword =
  (id, passwordbody, setSnackBarOpen) => async (dispatch) => {
    try {
      dispatch({ type: "Loading_start_password" });

      const { data } = await api.changePassword(id, passwordbody);
      dispatch({ type: "CHANGE_PASSWORD", payload: data });
      dispatch({ type: "Loading_end_password" });
      setSnackBarOpen(true);
    } catch (err) {
      dispatch({ type: "Loading_end_password" });
      dispatch({ type: "IS_USER_ERROR", payload: err.response.data.message });
    }
  };
