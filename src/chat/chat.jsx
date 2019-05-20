import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { sendMessage } from "../redux/send_message";
import "./chat.scss";
import Menu from "./menu/menu.jsx";
import Correspondence from "./correspondence/correspondence.jsx";
import { connect } from "react-redux";
import {
  getChekLoginError,
  getChekLoginLoading,
  getUserData,
  checkLogin,
  allUsers,
  getOnlineUsers,
  getUserStatus,
  getSocket
} from "../redux/reducers/auth";
import Loader from "react-loader-spinner";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { id: "" }
    };
  }

  addSocketEvents = data => {
    this.props.socket.emit("connectUser", {
      displayName: data.displayName,
      id: data.id
    });
    this.props.socket.on("onlineUser", data => {
      this.props.allUsers(data);
    });
  };

  checkLogin = async () => {
    try {
      const chek = await this.props.checkLogin();
      return chek;
    } catch (error) {
      console.log("error", error);
    }
  };
  async componentDidMount() {
    const checkLoginResult = await this.checkLogin();
    if (checkLoginResult && this.props.socket !== null) {
      this.addSocketEvents(checkLoginResult);
    }
  }
  componentDidUpdate(prevState, prevProps) {
    if (
      !this.props.loading &&
      this.props.userStatus &&
      prevProps.socket === null &&
      this.props.socket !== null
    ) {
      this.addSocketEvents(this.props.userData);
    }
  }
  render() {
    if (!this.props.userStatus) {
      return <Redirect to="/" />;
    }
    return (
      <div className="chat_box">
        <Menu />
        {this.props.socket === null ? (
          <Loader type="ThreeDots" color="#53d48b" height={80} width={80} />
        ) : (
          <Correspondence />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userData: getUserData(state),
    loading: getChekLoginLoading(state),
    error: getChekLoginError(state),
    onlineNow: getOnlineUsers(state),
    userStatus: getUserStatus(state),
    socket: getSocket(state)
  };
};

const mapDispatchToProps = {
  checkLogin,
  allUsers,
  sendMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
