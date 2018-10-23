import React, { Component } from "react";
import { connect } from "react-redux";
import { signUpUser } from "../actions/index";
import { Field, reduxForm } from "redux-form";

class SignUpForm extends Component {
  state = {
    messageServer: ""
  };

  renderField = field => {
    const {
      meta: { touched, error }
    } = field;
    return (
      <div>
        <label>{field.label}</label>
        <input type="text" {...field.input} />
        <div className="errorMessage">{touched ? error : ""}</div>
      </div>
    );
  };

  onSubmit = values => {
    this.props.signUpUser(
      values,
      () => this.props.history.push("/home"),
      this.renderErrorServer
    );
  };

  renderErrorServer = messageServer => {
    this.setState({ messageServer });
  };

  render() {
    const { handleSubmit } = this.props;

    if (this.props.username) {
      return <div>You are already Login</div>;
    }

    return (
      <div className="container">
        <div className="formContainer">
          <form
            className="signForm"
            onSubmit={handleSubmit(values => this.onSubmit(values))}
          >
            <Field label="Name" name="name" component={this.renderField} />
            <Field
              label="Password"
              name="password"
              component={this.renderField}
            />
            <Field label="Email" name="email" component={this.renderField} />
            <div className="errorMessage">{this.state.messageServer}</div>
            <button type="submit">Sign In!</button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "You must providea name";
  }
  if (!values.password) {
    errors.password = "You must providea password";
  }
  if (!values.email) {
    errors.email = "You must provide an email";
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    username: state.user.name
  };
}

export default reduxForm({ validate: validate, form: "signUpForm" })(
  connect(
    mapStateToProps,
    { signUpUser }
  )(SignUpForm)
);
