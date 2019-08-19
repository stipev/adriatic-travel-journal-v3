// import {

// } from "../actions/types.js";

const SHOW_HOME = "SHOW_HOME";
const SHOW_SIGN_IN = "SHOW_SIGN_IN";
const SHOW_ALL_AND_SIGN_OUT = "SHOW_ALL_AND_SIGN_OUT";

const initState = {
  showHome: false,
  showSignIn: true,
  showAllAndSignOut: false
};

const navBarReducer = (state = initState, action) => {
  switch (action.type) {
    case SHOW_HOME:
      return {
        showHome: true,
        ...state
      };
    case SHOW_SIGN_IN:
      return {
        showSignIn: true,
        ...state
      };
    case SHOW_ALL_AND_SIGN_OUT:
      return {
        showAllAndSignOut: true,
        ...state
      };
    default:
      return state;
  }
};

export default navBarReducer;
