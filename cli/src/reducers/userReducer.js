import { FETCH_USER, LOG_OUT_USER } from "../actions/type";

export default (state = { name: "" }, action) => {
  //console.log(action.payload);
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case LOG_OUT_USER:
      return { name: "" };
    default:
      return state;
  }
};
