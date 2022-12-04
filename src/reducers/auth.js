import { AUTH } from "../constants/actionTypes";

const authReducer = (
  authReducer = {
    authData: null,
    loading: false,
    change_pass_loading: false,
    allUser: [],
    singleUser: {},
    isUserError: false,
  },
  action
) => {
  switch (action.type) {
    case "LOADING_START":
      return { ...authReducer, loading: true };

    case "LOADING_END":
      return { ...authReducer, loading: false };

    case "Loading_start_password":
      return { ...authReducer, change_pass_loading: true };
    case "Loading_end_password":
      return { ...authReducer, change_pass_loading: false };
    case "IS_USER_ERROR":
      return { ...authReducer, isUserError: action.payload };

    case "NO_ERROR":
      return { ...authReducer, isUserError: false };
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...authReducer,
        authData: action.data,
      };

    case "LOGIN_FAILURE":
      return {
        ...authReducer,
        authData: null,
        loading: false,
        isUserError: action.payload,
      };

    case "LOGOUT":
      localStorage.clear("profile");

      return { ...authReducer, authData: null, loading: false, errors: null };

    case "FETCH_USERS":
      return {
        ...authReducer,
        allUser: action.payload,
      };

    case "FETCH_USER_BY_ID":
      return { ...authReducer, singleUser: action.payload };

    case "UPDATE_USER":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return {
        ...authReducer,
        singleUser: authReducer.singleUser.map((p) =>
          p._id === action.data._id ? action?.data : p
        ),
      };
    // case "CHANGE_PASSWORD":
    //   return {
    //     ...authReducer,
    //     singleUser: action.payload,
    //   };

    default:
      return authReducer;
  }
};

export default authReducer;
