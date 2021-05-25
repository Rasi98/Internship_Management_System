import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
