import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Link  } from "react-router-dom";
import { Redirect } from "react-router";
import "./login.scss";

import {
  login,
  getLoginError,
  getLoginLoading,
  getUserStatus,
  checkLogin
} from "../redux/reducers/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logined: false
    };
  }
  async componentDidMount() {
    const checkLoginResult = await this.checkLogin();
    if (checkLoginResult) {
      this.setState({
        logined: true
      });
    } else {
      this.setState({
        logined: false
      });
    }
  }
  onSubmit = async values => {
    try {
      const { email, password } = values;
      const loginData = await this.props.login(email, password);
      console.log("loginData", loginData);
    } catch (error) {
      console.log("error", error);
    }
  };

  checkLogin = async () => {
    try {
      const chek = await this.props.checkLogin();
      return chek;
    } catch (error) {
      console.log("err", error);
    }
  };

  render() {
    if (this.props.userStatus) {
      return <Redirect to="/chat" />;
    }
    const { loading, error } = this.props;
    return (
      <div className="login-box">
        <Form
          onSubmit={this.onSubmit}
          initialValues={{ employed: false }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="login__data">
                <div>
                  <label>E-mail</label>
                  <Field
                    validate={value => {
                      if (!!value) {
                        return undefined;
                      }

                      return "This field cannot be empty";
                    }}
                    className="loginData"
                    name="email"
                    component="input"
                    type="text"
                    placeholder="Login"
                    disabled={loading || submitting}
                  />
                </div>
                <div>
                  <label>Password</label>
                  <Field
                    className="loginData"
                    name="password"
                    component="input"
                    type="password"
                    placeholder="Password"
                    disabled={loading || submitting}
                  />
                </div>
              </div>
              <div className="errorBox">{!!error && <pre>{error}</pre>}</div>
              <div className="buttons">
                <button type="submit" disabled={loading || submitting}>
                  Login
                </button>
                <Link to="/registration">
                  <button type="button">Registration</button>
                </Link>
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
    loading: getLoginLoading(state),
    error: getLoginError(state),
    userStatus: getUserStatus(state)
  };
};

const mapDispatchToProps = {
  login,
  checkLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
