import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class Edititpc extends Component {
  constructor(props) {
    super(props);
    console.log(props.data);
    this.state = {
      id: "",
      name: "",
      email: "",
      phone: "",
      username: "",
      password: "",
    };
  }

  componentDidMount(props) {
    console.log(props);
    this.setState({
      id: this.props.data.id,
      name: this.props.data.name,
      email: this.props.data.email,
      phone: this.props.data.phone,
      username: this.props.data.username,
      password: this.props.data.password,
    });
    // axios
    //   .get("http://localhost:5000/itpc/" + this.state.id)
    //   .then((Response) => {
    //     console.log(Response);
    //     this.setState({
    //       name: Response.data.name,
    //       email: Response.data.email,
    //       phone: Response.data.phone,
    //       username: Response.data.username,
    //       password: Response.data.password,
    //     });
    //   });
  }

  handlenamechange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleemailchange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlephonechange = (e) => {
    this.setState({ phone: e.target.value });
  };
  handleusernamechange = (e) => {
    this.setState({ username: e.target.value });
  };
  handlepasswordchange = (e) => {
    this.setState({ password: e.target.value });
  };

  handlesubmit = (e) => {
    const itpc = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/itpc/update/" + this.state.id, itpc)
      .then((res) => {
        const response = res.data;
        console.log(response);
      });
    window.location = "/usercontrol/itpc";
  };

  render() {
    console.log(this.props.data);
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit ITPC
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-5">
            <div className="form-group">
              <label htmlFor="companyname">Name</label>
              <input
                type="text"
                id="Name"
                className="form-control"
                placeholder="Enter name"
                value={this.state.name}
                onChange={this.handlenamechange}
                required
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="companyemail">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleemailchange}
                required
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="companymobile">Phone No</label>
              <br></br>
              <input
                type="number"
                maxLength="10"
                id="Phone"
                className="form-control"
                placeholder="Enter phone no."
                value={this.props.data.phone}
                onChange={this.handlephonechange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="companymobile">Username</label>
              <br></br>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter username"
                value={this.props.data.username}
                onChange={this.handleusernamechange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="companymobile">Password</label>
              <br></br>
              <input
                type="text"
                id="password"
                className="form-control"
                placeholder="Enter password"
                value={this.props.data.password}
                onChange={this.handlepasswordchange}
              ></input>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-sm btn-block"
              onClick={this.handlesubmit}
            >
              Update
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Edititpc;
