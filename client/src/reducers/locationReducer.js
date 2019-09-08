import { SET_ALL_LOCATIONS, MARK_VISITED_LOCATION } from "../actions/types";

const initState = { locations: [] };

const locationReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ALL_LOCATIONS:
      return {
        ...state,
        locations: action.locations
      };
    case MARK_VISITED_LOCATION:
      let { locations } = action;

      let locationsBuffer = state.locations.map(location => {
        location.visited = false;
        return location;
      });

      locationsBuffer = locationsBuffer.map(location => {
        for (let i = 0; i < locations.length; i++) {
          if (locations[i] === location.name) {
            location.visited = true;
          }
        }
        return location;
      });
      return {
        ...state,
        locations: locationsBuffer
      };

    default:
      return state;
  }
};

export default locationReducer;
