import { SET_ALL_REVIEWS, SET_USER_REVIEWS } from "../actions/types";

const initState = { reviews: [], userReviews: [] };

const reviewReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ALL_REVIEWS:
      return {
        ...state,
        reviews: action.reviews
      };
    case SET_USER_REVIEWS:
      return {
        ...state,
        userReviews: action.reviews
      };

    default:
      return state;
  }
};

export default reviewReducer;
