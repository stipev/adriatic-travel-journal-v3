import { combineReducers } from "redux";
import codeReducer from "./codeReducer";
import locationReducer from "./locationReducer";
import reviewReducer from "./reviewReducer";

export default combineReducers({ codeReducer, locationReducer, reviewReducer });
