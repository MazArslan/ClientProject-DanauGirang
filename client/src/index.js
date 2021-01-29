import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import "regenerator-runtime/runtime";

const title = "Wildlife.DATA";

ReactDOM.render(
  <BrowserRouter>
    <App title={title} />
  </BrowserRouter>,
  document.getElementById("app")
);

// Allows for React components to be live reloaded without
// a loss of state.
// Docs: https://github.com/gaearon/react-hot-loader
// Comment this out if you don't need it whilst testing
module.hot.accept();
