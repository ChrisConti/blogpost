import { FETCH_TRIPS, ADD_TRIP, DELETE_TRIP } from "../actions/type";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TRIPS:
      return action.payload;
    case ADD_TRIP:
      return { ...state, trip: [...state.trip, action.payload] };
    case DELETE_TRIP:
      return {
        ...state,
        trip: state.trip.filter(item => item !== action.payload)
      };
    default:
      return state;
  }
};
