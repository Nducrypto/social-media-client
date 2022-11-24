import { combineReducers } from "redux";

import allPosts from "./posts";
import authReducer from "./auth";

export default combineReducers({ allPosts, authReducer });
