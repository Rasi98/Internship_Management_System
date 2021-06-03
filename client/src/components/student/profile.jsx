import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ProfileComponent from "./Resume/profileComponent";
import eductionComponent from "./Resume/eductionComponent";
import { Container } from "@material-ui/core/Container";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <ProfileComponent />
      </div>
    );
  }
}

export default Profile;
