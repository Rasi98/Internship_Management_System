import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import Student from "./student";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
    {/* <Student /> */}
  </BrowserRouter>,
  document.getElementById("root")
);
