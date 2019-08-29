import { SET_ALL_REVIEWS } from "../actions/types";
import { SIGN_OUT } from "../actions/types";

const initState = { reviews: [] };

const reviewReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ALL_REVIEWS:
      return {
        ...state,
        reviews: action.reviews
      };
    case SIGN_OUT:
      return {
        ...state,
        reviews: initState
      };
    default:
      return state;
  }
};

export default reviewReducer;
