import { SET_ALL_LOCATIONS } from "../actions/types";
import { MARK_VISITED_LOCATION } from "../actions/types";

const initState = { locations: [] };

const locationReducer = (state = initState, action) => {
  //console.log("PRIMLJENE LOKACIJE: ", action);
  switch (action.type) {
    case SET_ALL_LOCATIONS:
      return {
        ...state,
        locations: action.locations
      };
    case MARK_VISITED_LOCATION:
      //console.log("AKCIJAAAAA:", action.location);
      let locations = state.locations.map(location => {
        if (action.location === location.name) {
          location.visited = true;
        }

        return location;
      });
      //console.log("state ", state);
      //console.log("LOCATIONN: ", action.location);

      return {
        ...state,
        locations
      };
    default:
      return state;
  }
};

export default locationReducer;
