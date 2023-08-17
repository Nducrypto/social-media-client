import { combineReducers } from "redux";

import timeline from "./posts";
import authReducer from "./auth";

export default combineReducers({ timeline, authReducer });
