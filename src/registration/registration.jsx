import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "./registration.scss";

import {
  registration,
  getRegistrationError,
  getRegistrationLoading
} from "../redux/reducers/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationSucces: false
    };
  }
  onSubmit = async values => {
    try {
      const { login, mail, password } = values;
      const registrationData = await this.props.registration(
        login,
        mail,
        password
      );
      if (registrationData) {
        this.setState({ registrationSucces: true });
      }
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };

  render() {
    if (this.state.registrationSucces) {
      return <Redirect to="/" />;
    }
    return (
      <div className="registration-box">
        <Form
          onSubmit={this.onSubmit}
          initialValues={{ employed: false }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="registration__data">
                <div>
                  <label>Login</label>
                  <Field
                    className="registrationData"
                    name="login"
                    component="input"
                    type="text"
                    placeholder="Login"
                  />
                </div>
                <div>
                  <label>E-mail</label>
                  <Field
                    className="registrationData"
                    name="mail"
                    component="input"
                    type="text"
                    placeholder="E-mail"
                  />
                </div>
                <div>
                  <label>Password</label>
                  <Field
                    className="registrationData"
                    name="password"
                    component="input"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label>Confirm Password</label>
                  <Field
                    className="registrationData"
                    name="confirm"
                    component="input"
                    type="password"
                    placeholder="Repeat password"
                  />
                </div>
              </div>
              <div className="errorBox">
                {values.password !== values.confirm && values.password && (
                  <pre className="errorBox">"Пароли не совпадают"</pre>
                )}
                {(!values.password || !values.login || !values.mail) && (
                  <pre className="errorBox">"Заполните все поля"</pre>
                )}
              </div>
              <div className="buttons">
                <button
                  type="submit"
                  disabled={
                    values.password !== values.confirm ||
                    !values.password ||
                    !values.confirm ||
                    !values.login ||
                    !values.mail
                  }
                >
                  Create Account
                </button>
                <Link to="/">
                  <button type="button">Login</button>
                </Link>
                {/* </Link> */}
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: getRegistrationLoading(state),
    error: getRegistrationError(state)
  };
};

const mapDispatchToProps = {
  registration
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
