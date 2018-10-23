import React, { Component } from "react";
import TripCard from "./TripCard";
import { connect } from "react-redux";
import { getTripsList } from "../actions";

class TripList extends Component {
  componentDidMount() {
    this.props.getTripsList();
  }
  renderContent() {
    return this.props.tripsList.map(trip => (
      <TripCard key={trip._id} trip={trip} />
    ));
  }
  render() {
    if (!this.props.tripsList) return <div className="show">Loading...</div>;
    return <div className="tripListContainer">{this.renderContent()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    tripsList: state.trips.trip
  };
}

export default connect(
  mapStateToProps,
  { getTripsList }
)(TripList);
