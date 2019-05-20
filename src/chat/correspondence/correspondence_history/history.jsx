import React, { Component } from "react";
import "./history.scss";
import { connect } from "react-redux";
import { getUserData, checkLogin } from "../../../redux/reducers/auth";
import * as ReactDOM from 'react-dom';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageHistory: []
    };
  }
  componentDidMount() {
    const socket = this.props.socket;
    socket.on("newMessage", data => {
      console.log(data);
      this.setState({ messageHistory: this.state.messageHistory.concat(data) });
    });
  }
  scrollToBottom = () => {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  componentDidUpdate(){
    this.scrollToBottom();
  }
  render() {
    console.log("Message history0", this.state.messageHistory);
    return (
      <div className="history_box">
        <ul className="message_history" ref="messageList">
          {this.state.messageHistory.map((item, i) => {
            const message = item.message;
            const time = item.time;
            const user = item.user;
            console.log("item", message);
            return (
              <li
                key={`messageId-${i}`}
                className={
                  (user === "Primarch")
                    ? ((user === this.props.userData.displayName) ? "iAmPrimarch" : "primarchMessage")
                    : (user === this.props.userData.displayName)
                    ? "selfMessage"
                    : "message"
                }
              >
                <div className="messageBox">
                  <p className="messageUser">{user + ': '}</p>
                  <p className="messageText">{message}</p>
                </div>
                <p className="messageTime">{time}</p>
              </li>
            );
          })}
        </ul>
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
  checkLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(History);
