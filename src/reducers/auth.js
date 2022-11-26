// import * as actionType from "../constants/actionTypes";

const authReducer = (
  authReducer = {
    authData: null,
    loading: false,
    allUser: [],
    singleUser: [],
    isUserError: false,
  },
  action
) => {
  switch (action.type) {
    case "LOADING_START":
      return { ...authReducer, loading: true };

    case "LOADING_END":
      return { ...authReducer, loading: false };
    case "IS_USER_ERROR":
      return { ...authReducer, isUserError: true };
    case "AUTH":
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
      localStorage.clear();

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

    // case actionType.AUTH:
    //   localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

    //   return {
    //     ...authReducer,
    //     authData: action.data,
    //   };
    // case actionType.LOGOUT:
    //   localStorage.clear();

    //   return { ...authReducer, authData: null, loading: false, errors: null };
    default:
      return authReducer;
  }
};

export default authReducer;
