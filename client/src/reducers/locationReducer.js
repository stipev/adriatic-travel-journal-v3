import {
  SET_ALL_LOCATIONS,
  MARK_VISITED_LOCATION,
  MARK_UNVISITED_LOCATION
} from "../actions/types";

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

      // let locations = state.locations.map(location => {
      //   if (action.location === location.name) {
      //     location.visited = true;
      //   }

      let { locations } = action;

      let locationsBuffer = state.locations.map(location => {
        location.visited = false;
        return location;
      });

      console.log("locations", locations);
      console.log("locationsBuffer", locationsBuffer);

      locationsBuffer = locationsBuffer.map(location => {
        for (let i = 0; i < locations.length; i++) {
          if (locations[i] === location.name) {
            location.visited = true;
          }
        }
        return location;
      });
      console.log("REDUCERRRR:", locationsBuffer);
      return {
        ...state,
        locations: locationsBuffer
      };

    default:
      return state;
  }
};

export default locationReducer;
