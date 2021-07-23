import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Image from "../resources/dash.jpg";
import {Paper} from "@material-ui/core";
const jwt = localStorage.getItem("token");

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
          <Paper elevation={4} className='mx-3 my-3'>
        <iframe
          width="100%"
          height="520"
          src="https://app.powerbi.com/reportEmbed?reportId=cdf35817-dcc1-477e-b961-c991c57dbf88&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
          </Paper>
      </div>
    );
  }
}

export default Home;
