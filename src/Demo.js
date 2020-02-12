import React from "react";
import { connect } from "react-redux";
import { Layout, Button } from "antd";
import {
  connectToWebsocket,
  sendWebsocketMessage,
  sendNotification,
  disconnectWebsocket
} from "./store";
import GetStore from "./containers/GetStore";
import Toggle from "./containers/Toggle";
import DisplayNotifications from "./containers/DisplayNotifications";

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null
    };
  }

  componentDidMount() {
    this.props.connectToWebsocket();
  }

  componentWillUnmount() {
    this.props.disconnectWebsocket();
  }

  render() {
    const {
      sendWebsocketMessage,
      socket,
      sendNotification,
      syncStore
    } = this.props;
    return (
      <Layout style={{ backgroundColor: "white" }}>
        <DisplayNotifications />
        SocketID: {socket && socket.id}
        <Button
          onClick={() => sendWebsocketMessage(socket, { type: "TOGGLE" })}
        >
          Send Message to Socket
        </Button>
        <GetStore />
        <Button onClick={() => syncStore()}>Sync Store</Button>
        <Button onClick={() => sendNotification({ message: "Works" })}>
          Send Notification
        </Button>
        <Toggle />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.websockets.socket,
    newMessage: state.websockets.newMessage,
    messages: state.websockets.messages
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  // getProfileData: event =>
  //   dispatch(getProfileData(ownProps.match.params.userId)), // dispatch action
  // listUserTags: event => dispatch(listUserTags(ownProps.match.params.userId)) // dispatch action
  connectToWebsocket: () => dispatch(connectToWebsocket()),
  sendNotification: message => dispatch(sendNotification(message)),
  sendWebsocketMessage: (socket, message, action) =>
    dispatch(sendWebsocketMessage(socket, message, action)),
  disconnectWebsocket: () => dispatch(disconnectWebsocket()),
  syncStore: () => dispatch({ type: "WEBSOCKET_SYNC_STORE" })
});

Demo = connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo);

export default Demo;
