import React, { Component } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import generator from "generate-password";

class Additaa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      genpassword: "",
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

  handlesubmit = (e) => {
    const itaa = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      username: this.state.username,
      password: this.state.password,
    };

    axios.post("http://localhost:5000/itaa/additaa", itaa).then((res) => {
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
          title: "ITAA added successfully",
        });
        window.location = "/usercontrol/itaa";
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
      genpassword: "",
    });
  };

  passwordGen = () => {
    var password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
    });
    console.log(password);
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
            {" "}
            <FontAwesomeIcon
              icon={faUserPlus}
              style={{ marginRight: "10px" }}
            />
            New ITAA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div className="form-group">
                  <label htmlFor="cname">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="Name"
                    className="form-control"
                    placeholder="Enter name"
                    value={this.state.name}
                    onChange={this.handlenamechange}
                    required
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleemailchange}
                    required
                  ></input>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
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
                    onChange={this.handlephonechange}
                  ></input>
                </div>
              </Col>
              <Col>
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
                    onChange={this.handleusernamechange}
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="form-group">
                  <label htmlFor="companymobile">Password</label>
                  <br></br>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={this.state.password}
                    placeholder="Enter password"
                    onChange={this.handlepasswordchange}
                  ></input>
                  <button onClick={this.passwordGen}>gen</button>
                </div>
              </Col>
            </Row>
            <Row className="text-center" style={{ margin: "5px" }}>
              <Col>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={this.handlesubmit}
                  style={{ width: "40%" }}
                >
                  Create
                </button>
              </Col>
            </Row>
            <Row className="text-center" style={{ margin: "5px" }}>
              <Col>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={this.handleClear}
                  style={{ width: "40%" }}
                >
                  Clear
                </button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Additaa;
