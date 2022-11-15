import * as actionType from "../constants/actionTypes";

const authReducer = (
  authReducer = { authData: null, loading: false },
  action
) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...authReducer, loading: true };

    case "END_LOADING":
      return { ...authReducer, loading: false };

    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return {
        ...authReducer,
        authData: action.data,
        loading: false,
        errors: null,
      };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...authReducer, authData: null, loading: false, errors: null };
    default:
      return authReducer;
  }
};

export default authReducer;
