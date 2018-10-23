import axios from "axios";
import { FETCH_USER, FETCH_TRIPS, ADD_TRIP, DELETE_TRIP } from "./type";

const TOKEN = localStorage.getItem("trip");
const CONFIG = {
  headers: { Authorization: `Bearer ${TOKEN}` }
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/getUser", CONFIG);
  console.log(localStorage.getItem("trip"));
  console.log(res.data);
  if (res.data.user) {
    dispatch({
      type: FETCH_USER,
      payload: { name: res.data.user.name }
    });
  }
};

//s'inscrire
export const signUpUser = (values, redirect, message) => async dispatch => {
  const res = await axios.post("/api/signup", values);
  if (res.data.user) {
    dispatch({
      type: FETCH_USER,
      payload: { name: res.data.user.name }
    });
    redirect();
  } else {
    message("Not working.. Try again!");
  }
};

//se connecter
export const signInUser = (values, redirect, message) => async dispatch => {
  const res = await axios.post("/api/signin", values);
  console.log(res.data);
  if (res.data.user) {
    localStorage.setItem("trip", res.data.token);
    dispatch({
      type: FETCH_USER,
      payload: { name: res.data.user.name }
    });
    redirect();
  } else {
    message("Not working.. Try again!");
  }
};

//se deconnecter
export const logOut = () => {
  localStorage.setItem("trip", "no");
  return {
    type: FETCH_USER,
    payload: { name: "" }
  };
};

//trips
export const createTrip = (values, redirect) => async dispatch => {
  const res = await axios.post("/api/createtrip", values, CONFIG);
  dispatch({
    type: ADD_TRIP,
    payload: res.data
  });
  redirect();
};

export const getTripsList = () => async dispatch => {
  const res = await axios.get("/api/triplist", CONFIG);
  dispatch({
    type: FETCH_TRIPS,
    payload: res.data
  });
};

export const deleteTrip = values => async dispatch => {
  await axios.post("/api/deletetrip", values._id, CONFIG);
  dispatch({
    type: DELETE_TRIP,
    payload: values
  });
};
