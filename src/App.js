import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import "./App.scss";
import Chat from "./chat/chat.jsx";
import Login from "./login/login.jsx";
import Registration from "./registration/registration.jsx";


class App extends Component {
  componentDidMount() {
    if (!!document.cookie) {
      return(<Redirect to="/chat/" />);
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header" />
          <div className="main-box">
            <Route path="/" exact component={Login} />
            <Route path="/chat/" component={Chat} />
            <Route path="/registration/" component={Registration} />
          </div>
          <footer className="App-footer"> </footer>
        </div>
      </Router>
    );
  }
}

export default App;
