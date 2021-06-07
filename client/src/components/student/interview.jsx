import React, { Component } from "react";
import Navbarstd from "../student/Navbar";

class Interview extends Component {
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
        <h1>Interview</h1>
      </React.Fragment>
    );
  }
}

export default Interview;
