import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
    };
  }
  render() {
    return <h1>login</h1>;
  }
}

export default Login;
