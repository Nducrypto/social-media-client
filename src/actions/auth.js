// import { AUTH } from "../constants/actionTypes";

import * as api from "../api/index.js";

//   SIGNIN
export const signin = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_START" });
    const { data } = await api.signIn(formData);
    dispatch({ type: "AUTH", data });
    dispatch({ type: "LOADING_END" });
    router.push("/");
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
  }
};

//  SIGNUP
export const signup = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_START" });

    const { data } = await api.signUp(formData);

    dispatch({ type: "AUTH", data });
    dispatch({ type: "LOADING_END" });

    router.push("/");
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();

    dispatch({ type: "FETCH_USERS", payload: data });
    // dispatch({ type: "LOADING_FALSE" });
  } catch (err) {
    dispatch({ type: "IS_USER_ERROR", payload: err.response.data.message });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUser(id);
    dispatch({ type: "FETCH_USER_BY_ID", payload: data });
    dispatch({ type: "LOADING_END" });
  } catch (err) {
    dispatch({ type: "IS_USER_ERROR", payload: err.response.data.message });
  }
};

export const updateUser = (id, update, history) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_START" });

    const { data } = await api.updateUser(id, update);

    dispatch({ type: "UPDATE_USER", data });

    dispatch({ type: "LOADING_END" });
    history.push("/");
  } catch (err) {
    dispatch({ type: "IS_USER_ERROR", payload: err.response.data.message });
  }
};
