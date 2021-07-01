import React, { Component } from "react";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import DateRangeIcon from "@material-ui/icons/DateRange";
import InputAdornment from "@material-ui/core/InputAdornment";
import "date-fns";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import generator from "generate-password";

class Addstudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      stuno: "",
      email: "",
      dob: "",
      address: "",
      mobile: "",
      gender: "",
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
  handlestunochange = (e) => {
    this.setState({ stuno: e.target.value });
  };
  handlephonechange = (e) => {
    this.setState({ mobile: e.target.value });
  };
  handledobchange = (e) => {
    this.setState({ dob: e.target.value });
  };
  handleaddresschange = (e) => {
    this.setState({ address: e.target.value });
  };
  handlegenderchange = (e) => {
    this.setState({ gender: e.target.value });
  };
  handleusernamechange = (e) => {
    this.setState({ username: e.target.value });
  };
  handlepasswordchange = (e) => {
    this.setState({ password: e.target.value });
  };

  handlesubmit = (e) => {
    const student = {
      name: this.state.name,
      stuno: this.state.stuno,
      email: this.state.email,
      dob: this.state.dob,
      address: this.state.address,
      mobile: this.state.mobile,
      gender: this.state.gender,
      username: this.state.username,
      password: this.state.password,
      role:"student",
    };

    axios
      .post("http://localhost:5000/student/addstudent", student)
      .then((res) => {
        const response = res.data.result;
        console.log(response);

        if (response == "success") {
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
            title: "Student added successfully",
          });
          //this.props.history.push("/usercontrol/student");
          window.location="/admin/usercontrol/student"
        } else {
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
      stuno: "",
      email: "",
      dob: "",
      address: "",
      mobile: "",
      gender: "",
      username: "",
      password: "",
    });
  };

  passwordGen = () => {
    var genpassword = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
    });
    this.setState({ ...this.state, password: genpassword });
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
            <FontAwesomeIcon
              icon={faUserPlus}
              style={{ marginRight: "10px" }}
            />
            New Student
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
                    id="Name"
                    name="name"
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
                  <label htmlFor="cname">Student No.</label>
                  <input
                    type="text"
                    id="stuno"
                    name="stuno"
                    className="form-control"
                    placeholder="Enter Student No."
                    value={this.state.stuno}
                    onChange={this.handlestunochange}
                    required
                  ></input>
                </div>
              </Col>
            </Row>
            <Row>
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
              <Col>
                <div className="form-group">
                  <label htmlFor="email">DOB</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="form-control"
                    placeholder="Enter DOB"
                    value={this.state.dob}
                    onChange={this.handledobchange}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DateRangeIcon />
                        </InputAdornment>
                      ),
                    }}
                  ></input>
                </div>
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <div className="form-group">
                  <label htmlFor="username">Address</label>
                  <br></br>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    placeholder="Enter address"
                    value={this.state.address}
                    onChange={this.handleaddresschange}
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="form-group">
                  <label htmlFor="mobile">Phone No</label>
                  <br></br>
                  <input
                    type="number"
                    maxLength="10"
                    id="Phone"
                    name="mobile"
                    className="form-control"
                    placeholder="Enter phone no."
                    value={this.state.mobile}
                    onChange={this.handlephonechange}
                  ></input>
                </div>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={this.state.gender}
                    onChange={this.handlegenderchange}
                    name="gender"
                  >
                    <option value="" selected disabled hidden>Choose here</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
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
                  <label htmlFor="password">Password</label>
                  <br></br>
                  <InputGroup className="mb-3">
                    <FormControl
                      type="password"
                      id="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handlepasswordchange}
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <Button
                        onClick={this.passwordGen}
                        variant="outline-secondary"
                      >
                        GEN
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Col>
            </Row>
            <Row className="text-center" style={{ margin: "5px" }}>
              <Col>
                <button
                  type="button"
                  className="btn btn-primary btn-sm "
                  onClick={this.handlesubmit}
                  style={{ width: "50%" }}
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
                  style={{ width: "50%" }}
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

export default Addstudent;
