import React from "react";
import { connect } from "react-redux";
import { Button, Input } from "antd";
import { sendWebsocketMessage } from "../store";

class GetStore extends React.Component {
  initialState = {
    clientId: null
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ clientId: e.target.value });
  }

  render() {
    return (
      <div>
        <Input
          name="clientId"
          onChange={this.onChange}
          value={this.state.clientId}
        />
        <Button
          onClick={() =>
            this.props.sendWebsocketMessage(
              this.props.socket,
              { socketId: this.state.clientId },
              "getStore"
            )
          }
        >
          Get Store via Socket
        </Button>
      </div>
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
  sendWebsocketMessage: (socket, message, action) =>
    dispatch(sendWebsocketMessage(socket, message, action))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetStore);
