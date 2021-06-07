import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Image from "../resources/dash.jpg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1 className="text-center">Home</h1>
        <img src={Image} alt="Italian Trulli" />
      </div>
    );
  }
}

export default Home;
