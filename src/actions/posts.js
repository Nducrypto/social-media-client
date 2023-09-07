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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

export const useSocketIo = () => {
  const socket = io(process.env.REACT_APP_SOCKET_URL, {
    withCredentials: true,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected);
      socket.on("new-posts", (newPosts) => {
        dispatch({ type: CREATE, payload: newPosts });
      });
      socket.on("delete-posts", (id) => {
        dispatch({ type: DELETE, payload: id });
      });
      socket.on("new-comment", (updatePostAfterComment) => {
        dispatch({ type: COMMENT, payload: updatePostAfterComment });
      });
      socket.on("remove-comment", (data) => {
        dispatch({ type: COMMENT, payload: data });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket]);
};

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
    await api.createPostApi(post);
  } catch (err) {
    console.log(err.response.data.message);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
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
    await api.comment(id, value);
  } catch (error) {
    console.log(error);
  }
};
export const deleteComment = (id, value) => async (dispatch) => {
  try {
    await api.deletecomment(id, value);
  } catch (error) {
    console.log(error);
  }
};
