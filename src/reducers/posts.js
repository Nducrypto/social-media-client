import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_BY_CREATOR,
  FETCH_POST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  END_LOADING,
  START_LOADING,
} from "../constants/actionTypes";

const allPosts = (
  allPosts = {
    isLoading: false,
    posts: [],
    post: {},
    searchposts: [],
    profileposts: [],
  },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...allPosts, isLoading: true };
    case END_LOADING:
      return { ...allPosts, isLoading: false };
    case FETCH_ALL:
      return {
        ...allPosts,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_CREATOR:
      return { ...allPosts, profileposts: action.payload };
    case FETCH_BY_SEARCH:
      return { ...allPosts, posts: action.payload };
    case FETCH_POST:
      return { ...allPosts, post: action.payload.post };
    case LIKE:
      return {
        ...allPosts,
        posts: allPosts.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case COMMENT:
      if (action.payload._id === allPosts.post._id) {
        return {
          ...allPosts,
          post: action.payload,
        };
      } else {
        return allPosts.post;
      }

    case CREATE:
      return { ...allPosts, posts: [...allPosts.posts, action.payload] };
    case UPDATE:
      return {
        ...allPosts,
        posts: allPosts.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...allPosts,
        posts: allPosts.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return allPosts;
  }
};

export default allPosts;
