import React, { Component } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Dashboard from "./Dashboard";
import TripForm from "./TripForm";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import Header from "./Header";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div style={{ height: "100%" }}>
          <Header />
          <Route exact path="/sign/up" component={SignUpForm} />
          <Route exact path="/sign/in" component={SignInForm} />
          <Route exact path="/tripform" component={TripForm} />
          <Route path="/home" component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
