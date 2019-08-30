import { combineReducers } from "redux";
import codeReducer from "./codeReducer";
import locationReducer from "./locationReducer";
import reviewReducer from "./reviewReducer";
import prizeTimerReducer from "./prizeTimerReducer";

export default combineReducers({
  codeReducer,
  locationReducer,
  reviewReducer,
  prizeTimerReducer
});
