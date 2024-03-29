import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (search) =>
  API.get(`/posts/search?searchQuery=${search}`);

// dis is for creating nw post and i used it in posts.js component in actions folder
export const createPostApi = (newPost) => API.post("/posts", newPost);
export const likePost = (id, userId) =>
  API.patch(`/posts/likePost/${id}`, userId);

export const comment = (id, value) =>
  API.post(`/posts/${id}/commentPost`, value);
export const deletecomment = (id, value) =>
  API.post(`/posts/deleteComment/${id}`, value);

// i received two params here (id, updatePost) cos we nid to knw d ID of d specific post we are updtin
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// =======USERS===
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);

export const fetchUsers = () => API.get("/users");
export const fetchUser = (id) => API.get(`/users/${id}`);

export const updateUser = (id, userUpdate) =>
  API.patch(`/users/${id}`, userUpdate);

export const updateUserAccess = (id, userUpdate) =>
  API.patch(`/users/access/${id}`, userUpdate);

export const changePassword = (id, passwordbody) =>
  API.patch(`/users/find/${id}`, passwordbody);
export const follow = (creator, followerId) =>
  API.patch(`/users/followers/${creator}`, followerId);
