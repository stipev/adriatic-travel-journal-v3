import { SET_ALL_LOCATIONS } from "../actions/types";

const initState = { locations: [] };

const locationReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ALL_LOCATIONS:
      return {
        ...state,
        locations: action.locations
      };

    default:
      return state;
  }
};

export default locationReducer;
