import React, { Component } from "react";
import { connect } from "react-redux";
import "./message.scss";
import { sendMessage } from "../../../redux/send_message.js";
import { getUserData, checkLogin } from "../../../redux/reducers/auth";

class Message extends Component {
  componentDidMount() {}
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleSendMessage = (event) => {
    var datetimeNow = new Date();
    const socket = this.props.socket;
    this.props.sendMessage(this.state.input);
    this.setState({ input: "" });
    if (this.state.input) {
      socket.emit("newMessage", {
        message: this.state.input,
        user: this.props.userData.displayName,
        time:
          datetimeNow.getDate() +
          "." +
          (datetimeNow.getMonth() + 1) +
          "." +
          datetimeNow.getFullYear() +
          " " +
          datetimeNow.getHours() +
          ": " +
          datetimeNow.getMinutes()
      });
  }
  };
  keySendMessage = (event) => {
    if(event.key === 'Enter'){
    var datetimeNow = new Date();
    const socket = this.props.socket;
    this.props.sendMessage(this.state.input);
    this.setState({ input: "" });
    if (this.state.input) {
      socket.emit("newMessage", {
        message: this.state.input,
        user: this.props.userData.displayName,
        time:
          datetimeNow.getDate() +
          "." +
          (datetimeNow.getMonth() + 1) +
          "." +
          datetimeNow.getFullYear() +
          " " +
          datetimeNow.getHours() +
          ": " +
          datetimeNow.getMinutes()
      });
    }
  }
  };

  render() {
    return (
      <div className="message_box">
        <div className="message_text">
          <input
            onChange={e => this.updateInput(e.target.value)}
            value={this.state.input}
            className="input_message"
            onKeyDown={this.keySendMessage}
          />
        </div>
        <div className="send_message">
          <button className="send" onClick={this.handleSendMessage} >
            <i className="fas fa-share-square fa-2x" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userData: getUserData(state)
  };
};

const mapDispatchToProps = {
  checkLogin, sendMessage 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Message);
