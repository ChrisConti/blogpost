import React, { Component } from "react";
import TripList from "./TripList";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  renderContent() {
    if (this.props.username) {
      return (
        <div>
          <TripList />
        </div>
      );
    }
    return (
      <div className="show">
        <Link to="/sign/in">Please, log in</Link>
      </div>
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.name
  };
}

export default connect(mapStateToProps)(Dashboard);
