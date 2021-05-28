import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class Addita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      company: "",
      username: "",
      password: "",
    };
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

  handlecompanychange = (e) => {
    this.setState({ company: e.target.value });
  };
  handlesubmit = (e) => {
    const ita = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      company: this.state.company,
      username: this.state.username,
      password: this.state.password,
    };

    axios.post("http://localhost:5000/ita/addita", ita).then((res) => {
      const response = res.data;
      console.log(response);

      if (response == "Success") {
        alert("User Created !");
      } else {
        alert("Error occured !");
      }
    });
    window.location = "/usercontrol/ita";
  };

  handleClear = (e) => {
    this.setState({
      name: "",
      email: "",
      phone: "",
      company: "",
      username: "",
      password: "",
    });
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">New ITA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-5">
            <div className="form-group">
              <label htmlFor="cname">Name</label>
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
              <label htmlFor="email">Email</label>
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
              <label htmlFor="mobile">Phone No</label>
              <br></br>
              <input
                type="number"
                maxLength="10"
                id="Phone"
                className="form-control"
                placeholder="Enter phone no."
                value={this.state.phone}
                onChange={this.handlephonechange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Company</label>
              <br></br>
              <input
                type="text"
                id="company"
                className="form-control"
                placeholder="Enter company"
                value={this.state.company}
                onChange={this.handlecompanychange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <br></br>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter username"
                value={this.state.username}
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
                value={this.state.password}
                onChange={this.handlepasswordchange}
              ></input>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-sm btn-block"
              onClick={this.handlesubmit}
            >
              Create
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm btn-block"
              onClick={this.handleClear}
            >
              Clear
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

export default Addita;
