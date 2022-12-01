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

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByCreator = (creator) =>
  API.get(`/posts/creator?creator=${creator}`);
export const fetchPostsBySearch = (search) =>
  API.get(`/posts/search?searchQuery=${search}`);

// dis is for creating nw post and i used it in posts.js component in actions folder
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id, userId) =>
  API.patch(`/posts/likePost/${id}`, userId);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });

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

export const changePassword = (id, passwordbody) =>
  API.patch(`/users/find/${id}`, passwordbody);
