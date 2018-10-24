import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTrip } from "../actions";

class TripCard extends Component {
  render() {
    return (
      <div className="cardContainer">
        <div className="card">
          <div style={{ justifyContent: "space-between" }}>
            <label>City : </label>
            <label>{this.props.trip.city}</label>
          </div>
          <div>
            <label>Title : </label>
            <label>{this.props.trip.title}</label>
          </div>
          <div>
            <label>Exp : </label>
            <label>{this.props.trip.exp}</label>
          </div>
          <div>
            <label>Tips : </label>
            <label>{this.props.trip.tips}</label>
          </div>
          <button onClick={() => this.props.deleteTrip(this.props.trip)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteTrip }
)(TripCard);
