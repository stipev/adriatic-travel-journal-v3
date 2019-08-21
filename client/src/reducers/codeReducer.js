import { ADD_CODE, SET_ALL_CODES } from "../actions/types";

const initState = { userCodes: [] };

const codeReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_CODE:
      let codes = state.userCodes;
      codes.push(action.code);

      return {
        ...state,
        userCodes: codes
      };
    case SET_ALL_CODES:
      //console.log("REDUX payload: ", action.codes);
      return {
        ...state,
        userCodes: action.codes
      };
    default:
      return state;
  }
};

export default codeReducer;
