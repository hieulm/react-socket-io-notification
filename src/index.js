import React from "react";
import ReactDOM from "react-dom";
// redux
import { Provider } from "react-redux";
import store from "./store";
// custom
import Demo from "./Demo";
import "antd/dist/antd.css";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Demo />
  </Provider>,
  rootElement
);
