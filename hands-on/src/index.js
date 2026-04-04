import "react-app-polyfill/ie11";

// React
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
// Render VotingComponent
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);