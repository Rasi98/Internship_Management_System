import React, { Component } from "react";
import Navbar from "./Navbar";

class strategicReport extends Component {
  state = {};

  componentDidMount() {
      document.body.style='background: #E5E7E9;'
  }

    render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
          <h3 className="text-center my-3 mb-3" style={{fontFamily: 'Assistant'}}>Report</h3>
      </React.Fragment>
    );
  }
}

export default strategicReport;
