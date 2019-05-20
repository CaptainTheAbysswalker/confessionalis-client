import { combineReducers } from "redux";
import todos from "./todo";
import auth from "./auth";

export default combineReducers({ todos, auth });
