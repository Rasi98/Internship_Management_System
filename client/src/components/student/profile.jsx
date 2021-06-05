import React, { Component } from "react";
import ProfileComponent from "./Resume/profileComponent";

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
