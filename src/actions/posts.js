import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  NOTIFICATION,
} from "../constants/actionTypes";
import * as api from "../api/index.js";
import { extractOtherUserComments } from "./getNotifications";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page);

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    const filteredComments = extractOtherUserComments(data);
    dispatch({ type: NOTIFICATION, payload: filteredComments });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPostApi(post);

    dispatch({ type: CREATE, payload: data });
  } catch (err) {
    console.log(err.response.data.message);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const likePost = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id, userId);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (id, value) => async (dispatch) => {
  try {
    const { data } = await api.comment(id, value);

    dispatch({ type: COMMENT, payload: data });

    // return data.comments;
  } catch (error) {
    console.log(error);
  }
};
export const deleteComment = (id, value) => async (dispatch) => {
  console.log(value);
  try {
    const { data } = await api.deletecomment(id, value);
    dispatch({ type: COMMENT, payload: data });
    // return data.comments;
  } catch (error) {
    console.log(error);
  }
};
