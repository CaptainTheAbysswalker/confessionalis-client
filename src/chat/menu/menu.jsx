import React, { Component } from "react";
import "./menu.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


import {
  logout,
  getLogoutError,
  getLogoutLoading,
  getUserData,
  getOnlineUsers,
  getSocket
} from "../../redux/reducers/auth";


class ProfileMenu extends Component {
  render() {
    return (
      <div className="submenu__profile-item">
        <ul>
          <li className="profileItem">Login: {this.props.user.displayName}</li>
          <li className="profileItem">email: {this.props.user.email}</li>
          <li className="profileItem">id: {this.props.user.id}</li>
        </ul>
      </div>
    );
  }
}

class ContactsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineUsers: []
    };
  }
componentDidMount(){
}
  render() {
    return (
      <div className="submenu__contacts-item">
        <ul className="onlineUsers">
        <h3>Online Users</h3>
          {this.props.onlineUsers.data.onlineUsers.map((item, i) => {
            const login = item.displayName;
            console.log("user", login);
            return (
              <li key={`contactId-${i}`} className="contactData">
                <p className="contactLogin">{'Login: ' + login}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logined: false,
      currentButton: "profile",
      currentItem: 1,
      user: { id: null },
      onlileUsers: []
    };
  }
  componentDidUpdate() {
    if (!this.state.user.id && this.props.userData) {
      this.setState(Object.assign(this.state.user, this.props.userData));
    }
  }
  logOut = async id => {
    try {
      console.log("id", id);
      const logoutData = await this.props.logout(id);
      console.log("logoutData", logoutData);
    } catch (error) {
      console.log("error", error);
    }
  };
  choseItem(i) {
    this.setState({
      currentItem: i
    });
    switch (i) {
      case 2:
        return this.setState({
          currentButton: "profile"
        });
      case 3:
        return this.setState({
          currentButton: "contacts"
        });
      default:
        return this.setState({
          currentButton: "profile"
        });
    }
  }

  currentMenu() {
    switch (this.state.currentItem) {
      case 2:
        return <ProfileMenu user={this.props.userData} />;
      case 3:
        return <ContactsMenu onlineUsers={this.props.onlineNow} />;
      default:
        return <ProfileMenu user={this.props.userData}/>;
    }
  }
  render() {
    return (
      <div className="menu">
        <div className="main-menu">
          <div className="menu__avatar"> </div>
          <div className="menu__items">
            <ul>
              <li>
                <button
                  className={`menu__button ${
                    this.state.currentButton === "profile"
                      ? "menu__button_active"
                      : "menu__button"
                  }`}
                  onClick={() => this.choseItem(2)}
                >
                  <i className="fas fa-user fa-2x" />
                </button>
              </li>
              <li>
                <button
                  className={`menu__button ${
                    this.state.currentButton === "contacts"
                      ? "menu__button_active"
                      : "menu__button"
                  }`}
                  onClick={() => this.choseItem(3)}
                >
                  <i className="fas fa-users fa-2x" />
                </button>
              </li>
            </ul>
          </div>
          <div className="menu__exit-button">
            <Link to="/">
              <button
                className="menu__button"
                onClick={() => this.logOut(this.state.user.id)}
              >
                <i className="fas fa-sign-out-alt fa-2x" />
              </button>
            </Link>
          </div>
        </div>
        <div className="submenu">
          {this.currentMenu()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userData: getUserData(state),
    loading: getLogoutLoading(state),
    error: getLogoutError(state),
    onlineNow: getOnlineUsers(state),
    socket: getSocket(state),
  };
};

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
