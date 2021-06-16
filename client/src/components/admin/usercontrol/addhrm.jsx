import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

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
      status: "Not Contacted",
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
      status: this.state.status,
    };

    axios.post("http://localhost:5000/hrm/addhrm", hrm).then((res) => {
      const response = res.data.result;
      console.log(response);

      if (response == "success") {
        //alert("User Created !");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "HRM added successfully",
        });
        window.location = "/usercontrol/hrm";
      } else {
        //alert("Error occured !");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response,
        });
      }
    });
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
              <label htmlFor="name">Name</label>
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
              <label htmlFor="designation">Designation</label>
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
