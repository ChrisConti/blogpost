import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../actions";

class Header extends Component {
  renderContent() {
    if (this.props.username) {
      return (
        <ul>
          <li>
            <Link to="/tripform" className="link">
              Add a trip
            </Link>
          </li>
          <li>
            <label
              className="link"
              onClick={() => {
                this.props.logOut();
              }}
            >
              Log out
            </label>
          </li>
        </ul>
      );
    }
    return (
      <ul>
        <li>
          <Link to="/sign/in" className="link">
            Sign In
          </Link>
        </li>
        <li>
          <Link to="/sign/up" className="link">
            Sign Up
          </Link>
        </li>
      </ul>
    );
  }
  render() {
    return (
      <div id="myTopnav" className="header">
        <div>
          <Link to="/home" className="navbar_site_name">
            Home
          </Link>
        </div>
        <div className="navbar_spacer" />
        <div className="navbar_elements">{this.renderContent()}</div>
        <div className="toggleButton">+</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.name
  };
}

export default connect(
  mapStateToProps,
  { logOut }
)(Header);
