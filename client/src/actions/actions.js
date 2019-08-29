import {
  SET_ALL_CODES,
  ADD_CODE,
  SET_ALL_LOCATIONS,
  SET_ALL_REVIEWS,
  SIGN_OUT,
  MARK_VISITED_LOCATION
} from "./types";

export const setAllLocations = locations => {
  return { type: SET_ALL_LOCATIONS, locations };
};
export const setAllReviews = reviews => {
  return { type: SET_ALL_REVIEWS, reviews };
};
export const setAllCodes = codes => {
  return { type: SET_ALL_CODES, codes };
};

export const addCode = code => {
  return { type: ADD_CODE, code };
};

export const markVisitedLocation = location => {
  return { type: MARK_VISITED_LOCATION, location };
};

export const _signOut = () => {
  console.log("!!!!ACTIONS LOGOUT!!!");
  return { type: SIGN_OUT };
};
