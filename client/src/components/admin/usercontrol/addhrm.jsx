import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class Addhrm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      designation: "",
      email: "",
      phone: "",
      company: "",
      department: "",
    };
  }

  handlechange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handlesubmit = (e) => {
    const hrm = {
      name: this.state.name,
      designation: this.state.designation,
      email: this.state.email,
      phone: this.state.phone,
      company: this.state.company,
      department: this.state.department,
    };

    axios.post("http://localhost:5000/hrm/addhrm", hrm).then((res) => {
      const response = res.data;
      console.log(response);

      if (response == "Success") {
        alert("User Created !");
      } else {
        alert("Error occured !");
      }
    });
    window.location = "/usercontrol/hrm";
  };

  handleClear = (e) => {
    this.setState({
      name: "",
      designation: "",
      email: "",
      phone: "",
      company: "",
      department: "",
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
          <Modal.Title id="contained-modal-title-vcenter">New HRM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-5">
            <div className="form-group">
              <label htmlFor="cname">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter name"
                value={this.state.name}
                onChange={this.handlechange}
                required
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="cname">Designation</label>
              <input
                type="text"
                id="designation"
                name="designation"
                className="form-control"
                placeholder="Enter designation"
                value={this.state.designation}
                onChange={this.handlechange}
                required
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handlechange}
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
                name="phone"
                className="form-control"
                placeholder="Enter phone no."
                value={this.state.phone}
                onChange={this.handlechange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Company</label>
              <br></br>
              <input
                type="text"
                id="company"
                name="company"
                className="form-control"
                placeholder="Enter company"
                value={this.state.company}
                onChange={this.handlechange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Department</label>
              <br></br>
              <input
                type="text"
                id="department"
                name="department"
                className="form-control"
                placeholder="Enter working Department"
                value={this.state.department}
                onChange={this.handlechange}
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

export default Addhrm;
