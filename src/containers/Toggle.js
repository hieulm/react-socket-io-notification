import React from "react";
import { connect } from "react-redux";
import { Switch } from "antd";
import { toggleSwitch } from "../store";

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

const Toggle = ({ on, toggle }) => <Switch checked={on} onChange={toggle} />;

const mapStateToProps = state => ({
  on: state.toggle.status
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggle: () => dispatch(toggleSwitch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toggle);
