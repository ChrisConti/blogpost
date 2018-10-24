import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createTrip } from "../actions";
import { Link } from "react-router-dom";

class TripForm extends Component {
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    return (
      <div>
        <label>{field.title}</label>
        <input {...field.input} type="text" contentEditable="true" />
        <div className="errorMessage">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit = values => {
    this.props.createTrip(values, () => this.props.history.push("/home"));
  };

  render() {
    if (!this.props.username) {
      return (
        <div className="show">
          <Link to="/sign/in">Please, log in</Link>
        </div>
      );
    }
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <div className="formContainer">
          <form
            className="signForm"
            onSubmit={handleSubmit(values => this.onSubmit(values))}
          >
            <Field title="City" name="city" component={this.renderField} />
            <Field title="Title" name="title" component={this.renderField} />
            <Field title="Experience" name="exp" component={this.renderField} />
            <Field title="Tips" name="tips" component={this.renderField} />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.city) errors.city = "You must provide a city";
  if (!values.title) errors.title = "You must provide a title";
  if (!values.exp) errors.exp = "You must provide an experience";
  if (!values.tips) errors.tips = "You must provide at leats one tips";

  return errors;
}

function mapStateToProps(state) {
  return {
    username: state.user.name
  };
}

export default reduxForm({
  validate: validate,
  form: "newTripForm"
})(
  connect(
    mapStateToProps,
    { createTrip }
  )(TripForm)
);
