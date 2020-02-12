import React from "react";
import { connect } from "react-redux";
import { notification } from "antd";

class DisplayNotifications extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.newNotification !== prevProps.newNotification) {
      this.openNotification(this.props.newNotification);
    }
  }

  openNotification({ message, description, type }) {
    console.log("works");
    if (type) {
      notification[type]({
        message,
        description
      });
      return;
    }

    notification.open({
      message,
      description,
      style: {
        width: 300,
        marginLeft: 335 - 300
      }
    });
  }

  render() {
    return "";
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications.notifications,
  newNotification: state.notifications.newNotification
});

export default connect(
  mapStateToProps,
  null
)(DisplayNotifications);
