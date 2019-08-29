import { SET_ALL_CODES } from "../actions/types";

const initState = { userCodes: [] };

const codeReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ALL_CODES:
      return {
        ...state,
        userCodes: action.codes
      };
    default:
      return state;
  }
};

export default codeReducer;
