import React, { Component } from "react";
import "./correspondence.scss";
import Message from "./message/message.jsx"
import History from "./correspondence_history/history.jsx"
import ChatProfile from "./chat_profile/chat_profile.jsx"

import { connect } from "react-redux";
import { getUserData, checkLogin, getSocket } from "../../redux/reducers/auth";

class Correspondence extends Component {

  
  render() {
    return (
      <div className="correspondence_box">
      <ChatProfile />
      <History socket={this.props.socket}/>
      <Message socket={this.props.socket}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userData: getUserData(state),
    socket: getSocket(state),
  };
};

const mapDispatchToProps = {
  checkLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Correspondence);
