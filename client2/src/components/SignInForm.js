import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signInUser } from "../actions";

class SignInForm extends Component {
  state = {
    messageServer: ""
  };

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    return (
      <div>
        <label>{field.title}</label>
        <input
          className="input"
          type={field.title === "Password" ? "password" : "text"}
          {...field.input}
        />
        <div className="errorMessage">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit = values => {
    this.props.signInUser(
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
            <Field title="Name" name="name" component={this.renderField} />
            <Field
              title="Password"
              name="password"
              component={this.renderField}
            />
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
    errors.name = "provde a name";
  }
  if (!values.password) {
    errors.password = "provde a password";
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    username: state.user.name
  };
}

export default reduxForm({
  validate: validate,
  form: "signInForm"
})(
  connect(
    mapStateToProps,
    { signInUser }
  )(SignInForm)
);
