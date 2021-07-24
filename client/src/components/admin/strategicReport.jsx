import React, { Component } from "react";
import Navbar from "./Navbar";
import {Paper} from "@material-ui/core";

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
        <Paper elevation={4} className='mx-3 my-3'>
          <iframe width="100%" height="541.25"
                  src="https://app.powerbi.com/reportEmbed?reportId=bb5c8340-a5f9-450f-8760-e0b81f38d194&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"
                  frameBorder="0" allowFullScreen="true"></iframe>
        </Paper>
      </React.Fragment>
    );
  }
}

export default strategicReport;
