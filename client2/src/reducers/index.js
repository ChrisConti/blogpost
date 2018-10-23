import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import userReducer from "./userReducer";
import tripsReducer from "./tripsReducer";

export default combineReducers({
  user: userReducer,
  trips: tripsReducer,
  form: reduxForm
});
