import React from "react";
import { connect } from "react-redux";

const Notification = props => {
  const { notification } = props.notification;

  console.log("notification", notification.length);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };

  return (
    <div>{notification ? <div style={style}>{notification}</div> : ""}</div>
  );
};

const mapStateToProps = state => {
  return {
    notification: state.notification ? state.notification : undefined
  };
};

export default connect(
  mapStateToProps,
  null
)(Notification);
