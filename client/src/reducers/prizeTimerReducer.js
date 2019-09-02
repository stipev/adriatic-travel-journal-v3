import {
  SET_PRIZE_TIMER,
  UPDATE_PRIZE_TIMER,
  TIMER_IS_DONE
  //SIGN_OUT
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
  timerIsOn: false
};

const prizeTimerReducer = (state = initState, action) => {
  switch (action.type) {
    case TIMER_IS_DONE:
      return {
        ...state,
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
    // case SIGN_OUT: {
    //   console.log("RADDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDIIIIILI");
    //   return {
    //     ...state,
    //     days: "",
    //     hours: "",
    //     minutes: "",
    //     seconds: ""
    //   };
    // }
    default:
      return state;
  }
};

export default prizeTimerReducer;
