import { AUTH } from "../constants/actionTypes";

// dis import ( * ) as api means we import everytin from d actions as api, meanin we wil b able to use  d stuffs in INDEX.js api folder
import * as api from "../api/index.js";

//   SIGNIN
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

//  SIGNUP
export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
