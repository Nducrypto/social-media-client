import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
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

    searchposts: [],
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

    case FETCH_BY_SEARCH:
      return { ...allPosts, posts: action.payload };

    case LIKE:
      return {
        ...allPosts,
        posts: allPosts.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case COMMENT:
      const updatedPosts = allPosts.posts.map((post) => {
        if (post._id === action.payload._id) {
          return {
            ...post,
            // Update the comment field or any other fields you want to modify
            comments: action.payload.comments,
          };
        }
        return post; // Return unchanged post for other posts
      });

      return {
        ...allPosts,
        posts: updatedPosts,
      };

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
