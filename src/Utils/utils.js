import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export function Following({ allUsers, creator }) {
  const matchingIds = [];
  allUsers.forEach((user) => {
    if (user?.followers.includes(creator)) {
      matchingIds.push(user._id);
    }
  });

  return matchingIds.length;
}

export const mergeSortArray = (arr, compareFn) => {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(
    mergeSortArray(left, compareFn),
    mergeSortArray(right, compareFn),
    compareFn
  );
};

const merge = (left, right, compareFn) => {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (compareFn(left[leftIndex], right[rightIndex]) < 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

// binarySearch.js
export const binarySearch = (arr, target, compareFn) => {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const comparisonResult = compareFn(target, arr[mid]);

    if (comparisonResult === 0) {
      return mid; // Found a match
    } else if (comparisonResult < 0) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return -1; // Not found
};

export const AuthProtected = ({ children }) => {
  const { loggedInUser } = useStateContext();
  if (loggedInUser?.result) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};
export const UserProtected = ({ children }) => {
  const { loggedInUser } = useStateContext();

  if (loggedInUser?.result) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
export const AdminProtected = ({ children }) => {
  const { loggedInUser } = useStateContext();

  if (loggedInUser?.result.isAdmin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
