import {
  SET_PRIZE_TIMER,
  UPDATE_PRIZE_TIMER,
  TIMER_IS_DONE,
  SET_WINNERS
} from "../actions/types";

const seconds = distance => Math.floor((distance % (1000 * 60)) / 1000);
const minutes = distance =>
  Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const hours = distance =>
  Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const days = distance => Math.floor(distance / (1000 * 60 * 60 * 24));

const initState = {
  days: "",
  hours: "",
  minutes: "",
  seconds: "",
  prizeTimer: "",
  timerIsOn: false,
  winners: []
};

const prizeTimerReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_WINNERS:
      return {
        winners: action.winners
      };
    case TIMER_IS_DONE:
      return {
        ...state,
        winners: action.winners,
        timerIsOn: false
      };
    case SET_PRIZE_TIMER:
      return {
        ...state,
        prizeTimer: action.prizeTimer,
        timerIsOn: true
      };
    case UPDATE_PRIZE_TIMER:
      let { distance } = action;

      return {
        ...state,
        days: distance < 0 ? "0" : days(distance),
        hours: distance < 0 ? "0" : hours(distance),
        minutes: distance < 0 ? "0" : minutes(distance),
        seconds: distance < 0 ? "0" : seconds(distance)
      };

    default:
      return state;
  }
};

export default prizeTimerReducer;
