import { SET_ALL_CODES, ADD_CODE, SET_ALL_LOCATIONS } from "./types";

export const setAllLocations = locations => {
  return { type: SET_ALL_LOCATIONS, locations };
};
export const setAllCodes = codes => {
  return { type: SET_ALL_CODES, codes };
};

export const addCode = code => {
  return { type: ADD_CODE, code };
};
