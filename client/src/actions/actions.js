import { SET_ALL_CODES } from "./types";
import { ADD_CODE } from "./types";

export const setAllCodes = codes => {
  return { type: SET_ALL_CODES, codes };
};

export const addCode = code => {
  return { type: ADD_CODE, code };
};
