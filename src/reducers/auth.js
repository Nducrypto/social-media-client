import {
  AUTH,
  NO_ERROR,
  LOGIN_FAILURE,
  LOGOUT,
  UPDATE_USER_ACCESS,
  FETCH_USERS,
  FETCH_USER_BY_ID,
  UPDATE_USER,
  IS_USER_ERROR,
  LOADING_START,
  LOADING_END,
  Loading_start_password,
  Loading_end_password,
  FOLLOW,
} from "../constants/actionTypes";

const authReducer = (
  authReducer = {
    authData: null,
    loading: false,
    change_pass_loading: false,
    allUsers: [],
    profile: {},
    isUserError: false,
  },
  action
) => {
  switch (action.type) {
    case LOADING_START:
      return { ...authReducer, loading: true };

    case LOADING_END:
      return { ...authReducer, loading: false };

    case Loading_start_password:
      return { ...authReducer, change_pass_loading: true };
    case Loading_end_password:
      return { ...authReducer, change_pass_loading: false };
    case IS_USER_ERROR:
      return { ...authReducer, isUserError: action.payload, loading: false };

    case NO_ERROR:
      return { ...authReducer, isUserError: false };
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...authReducer,
        authData: action.data,
      };

    case LOGIN_FAILURE:
      return {
        ...authReducer,
        authData: null,
        loading: false,
        isUserError: action.payload,
      };

    case LOGOUT:
      localStorage.clear("profile");

      return { ...authReducer, authData: null, loading: false, errors: null };

    case FETCH_USERS:
      return { ...authReducer, allUsers: action.payload };

    case UPDATE_USER_ACCESS:
      return {
        ...authReducer,
        allUsers: authReducer.allUsers.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case FOLLOW:
      return {
        ...authReducer,
        profile: action.payload,
      };

    case FETCH_USER_BY_ID:
      return { ...authReducer, profile: action.payload };

    case UPDATE_USER:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return {
        ...authReducer,
        profile: action.data,
      };

    default:
      return authReducer;
  }
};

export default authReducer;
