import { createSelector } from "reselect";
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
import { binarySearch, mergeSortArray } from "../Utils/utils";

// compare function for searching,
function comparePosts(postA, postB) {
  return postB._id.localeCompare(postA._id);
}

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
      const sortedArray = mergeSortArray(action.payload.data, (a, b) =>
        b._id.localeCompare(a._id)
      );
      return {
        ...timeline,
        allPosts: sortedArray,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case CREATE:
      const create = {
        ...timeline,
        allPosts: [...timeline.allPosts, action.payload],
      };

      const sort = mergeSortArray(create.allPosts, (a, b) =>
        b._id.localeCompare(a._id)
      );

      return { ...timeline, allPosts: sort };

    case FETCH_BY_SEARCH:
      const sortarray = mergeSortArray(action.payload, (a, b) =>
        b._id.localeCompare(a._id)
      );
      return { ...timeline, allPosts: sortarray };

    case LIKE:
      const { allPosts } = timeline;
      const likedPost = action.payload;
      // Find the index of the liked post using binary search
      const indexOfLikedPost = binarySearch(allPosts, likedPost, comparePosts);
      const updateLikedPost = [...allPosts];

      if (indexOfLikedPost !== -1) {
        updateLikedPost[indexOfLikedPost] = likedPost;
      }

      return {
        ...timeline,
        allPosts: updateLikedPost,
      };

    case COMMENT:
      const commentedPost = action.payload;
      const indexOfCommentedPost = binarySearch(
        timeline.allPosts,
        commentedPost,
        comparePosts
      );
      console.log(indexOfCommentedPost);
      const updateCommentedPost = [...timeline.allPosts];
      if (indexOfCommentedPost !== -1) {
        // Update the comment field
        updateCommentedPost[indexOfCommentedPost] = {
          ...updateCommentedPost[indexOfCommentedPost],
          comments: commentedPost.comments,
        };
      }

      return {
        ...timeline,
        allPosts: updateCommentedPost,
      };

    case UPDATE:
      const updatedPost = action.payload;
      const indexOfPost = binarySearch(
        timeline.allPosts,
        updatedPost,
        comparePosts
      );

      const updatePost = [...timeline.allPosts];
      if (indexOfPost !== -1) {
        updatePost[indexOfPost] = updatedPost;
      }

      return {
        ...timeline,
        allPosts: updatePost,
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
const selectTimeline = (state) => state.timeline;

export const selectAllPosts = createSelector(
  [selectTimeline],
  (timeline) => timeline.allPosts
);

export const postIsLoading = createSelector(
  [selectTimeline],
  (timeline) => timeline.isLoading
);

export default timeline;
