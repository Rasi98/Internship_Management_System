import React, { Component } from "react";
import Navbarstd from "../student/Navbar";

class Internship extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <Navbarstd />
        </div>
        <h1>Internship</h1>
      </React.Fragment>
    );
  }
}

export default Internship;
