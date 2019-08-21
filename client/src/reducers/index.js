import { combineReducers } from "redux";
import codeReducer from "./codeReducer";
import locationReducer from "./locationReducer";

export default combineReducers({ codeReducer, locationReducer });
