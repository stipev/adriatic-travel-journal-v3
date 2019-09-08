import {
  SET_ALL_CODES,
  ADD_CODE,
  SET_ALL_LOCATIONS,
  SET_ALL_REVIEWS,
  SIGN_OUT,
  MARK_VISITED_LOCATION,
  MARK_UNVISITED_LOCATION,
  SET_USER_REVIEWS,
  SET_PRIZE_TIMER,
  UPDATE_PRIZE_TIMER,
  TIMER_IS_DONE,
  SET_WINNERS
} from "./types";

export const timerIsDone = winners => {
  return { type: TIMER_IS_DONE, winners };
};
export const setWinners = winners => {
  return { type: SET_WINNERS, winners };
};
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

export const markVisitedLocation = locations => {
  return { type: MARK_VISITED_LOCATION, locations };
};

export const setUserReviews = reviews => {
  return { type: SET_USER_REVIEWS, reviews };
};

export const setPrizeTimer = prizeTimer => {
  return { type: SET_PRIZE_TIMER, prizeTimer };
};

export const updatePrizeTimer = distance => {
  return { type: UPDATE_PRIZE_TIMER, distance };
};
