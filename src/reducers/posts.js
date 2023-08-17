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
  NOTIFICATION,
} from "../constants/actionTypes";

const timeline = (
  timeline = {
    isLoading: false,
    allPosts: [],
    alert: [],
    notification: [],
    searchposts: [],
  },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...timeline, isLoading: true };
    case END_LOADING:
      return { ...timeline, isLoading: false };
    case FETCH_ALL:
      return {
        ...timeline,
        allPosts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_BY_SEARCH:
      return { ...timeline, allPosts: action.payload };

    case LIKE:
      return {
        ...timeline,
        allPosts: timeline.allPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case COMMENT:
      const updatedPosts = timeline.allPosts.map((post) => {
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
        ...timeline,
        allPosts: updatedPosts,
      };

    case CREATE:
      return { ...timeline, allPosts: [...timeline.allPosts, action.payload] };
    case UPDATE:
      return {
        ...timeline,
        allPosts: timeline.allPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...timeline,
        allPosts: timeline.allPosts.filter(
          (post) => post._id !== action.payload
        ),
      };

    case NOTIFICATION:
      return { ...timeline, notification: action.payload };
    default:
      return timeline;
  }
};

export default timeline;
