import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

class Additpc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      username: "",
      password: "",
    };
  }

  handlechange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handlesubmit = (e) => {
    const itpc = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      username: this.state.username,
      password: this.state.password,
    };

    axios.post("http://localhost:5000/itpc/additpc", itpc).then((res) => {
      const response = res.data.result;
      console.log(response);

      if (response == "Success") {
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
          title: "ITPC added successfully",
        });
        //this.props.history.push("/usercontrol/itpc");
        window.location="/admin/usercontrol/itpc";
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
      email: "",
      phone: "",
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
          <Modal.Title id="contained-modal-title-vcenter">
            Creat New ITPC
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-5">
            <div className="form-group">
              <label htmlFor="cname">Name</label>
              <input
                type="text"
                id="Name"
                name="name"
                className="form-control"
                placeholder="Enter name"
                value={this.state.name}
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
                name="phone"
                id="Phone"
                className="form-control"
                placeholder="Enter phone no."
                value={this.state.phone}
                onChange={this.handlechange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <br></br>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.handlechange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="companymobile">Password</label>
              <br></br>
              <input
                type="text"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={this.state.password}
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

export default Additpc;
