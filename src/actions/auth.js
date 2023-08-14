import {
  AUTH,
  LOGIN_FAILURE,
  UPDATE_USER_ACCESS,
  FETCH_USERS,
  FETCH_USER_BY_ID,
  UPDATE_USER,
  IS_USER_ERROR,
  LOADING_START,
  LOADING_END,
  Loading_start_password,
  Loading_end_password,
  FOLLOW,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

//   SIGNIN
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_START });
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    dispatch({ type: LOADING_END });
    navigate("/");
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err.response.data });
  }
};

//  SIGNUP
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_START });

    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    dispatch({ type: LOADING_END });

    navigate("/");
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err.response.data });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();

    dispatch({ type: FETCH_USERS, payload: data });
  } catch (err) {
    dispatch({ type: IS_USER_ERROR, payload: err.response.data.message });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUser(id);

    dispatch({ type: FETCH_USER_BY_ID, payload: data });
  } catch (err) {
    dispatch({ type: IS_USER_ERROR, payload: err.response.data.message });
  }
};

export const updateUser = (id, update, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_START });

    const { data } = await api.updateUser(id, update);

    dispatch({ type: UPDATE_USER, data });

    dispatch({ type: LOADING_END });
    navigate("/");
  } catch (err) {
    dispatch({ type: IS_USER_ERROR, payload: err.response.data.message });
  }
};
export const updateUserAccess = (id, update) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_START });

    const { data } = await api.updateUserAccess(id, update);
    // console.log(data);
    dispatch({ type: UPDATE_USER_ACCESS, payload: data });

    dispatch({ type: LOADING_END });
  } catch (err) {
    dispatch({ type: IS_USER_ERROR, payload: err.response.data.message });
  }
};

// ==== didn't use Redux because i am not instantly returning data
export const changePassword =
  (id, passwordbody, setSnackBarOpen) => async (dispatch) => {
    try {
      dispatch({ type: Loading_start_password });

      await api.changePassword(id, passwordbody);
      dispatch({ type: Loading_end_password });
      setSnackBarOpen(true);
    } catch (err) {
      dispatch({ type: IS_USER_ERROR, payload: err.response.data.message });
    }
  };

export const follow = (creator, followerId) => async (dispatch) => {
  try {
    const { data } = await api.follow(creator, followerId);

    dispatch({ type: FOLLOW, payload: data });
  } catch (error) {
    console.log(error);
  }
};
