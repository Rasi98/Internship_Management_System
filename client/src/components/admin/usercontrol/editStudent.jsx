import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Swal from "sweetalert2";
import DateRangeIcon from "@material-ui/icons/DateRange";
import InputAdornment from "@material-ui/core/InputAdornment";
import "date-fns";
import {Col, Row, Container, Form, InputGroup, FormControl, Button} from "react-bootstrap";
import generator from "generate-password";

class EditStudent extends Component {
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
      username:"",
      password:"",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/student/" + this.props.match.params.id)
      .then((Response) => {
        this.setState({
          name: Response.data.name,
          stuno: Response.data.stuno,
          email: Response.data.email,
          dob: Response.data.dob,
          address: Response.data.address,
          mobile: Response.data.mobile,
          gender: Response.data.gender,
          username:Response.data.username,
          password:Response.data.password,
        });
      });
  }
  handlechange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
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
      username:this.state.username,
      password:this.state.password,
    };

    axios
      .post(
        "http://localhost:5000/student/update/" + this.props.match.params.id,
        student
      )
      .then((res) => {
        const response = res.data.result;
        console.log(response);

        if (response == "updated") {
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
            title: "Updated successfully",
          });
          this.props.history.push("/usercontrol/student");

          //history.push("/company/viewcompany");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response,
          });
        }
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
      <React.Fragment>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h3 className="text-center" style={{ marginBottom: "20px" }}>
            Edit Student
          </h3>
          <form className="border" style={{ borderRadius: "10px" }}>
            <Container style={{ padding: "15px" }}>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter name"
                      value={(this, this.state.name)}
                      onChange={this.handlechange}
                    ></input>
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label htmlFor="stuno">Student No.</label>
                    <input
                      type="text"
                      name="stuno"
                      className="form-control"
                      placeholder="Enter Student No."
                      value={(this, this.state.stuno)}
                      onChange={this.handlechange}
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
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={(this, this.state.email)}
                      onChange={this.handlechange}
                    ></input>
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label htmlFor="dob">DOB</label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className="form-control"
                      placeholder="Enter DOB"
                      value={this.state.dob}
                      onChange={this.handlechange}
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
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Enter address"
                      value={(this, this.state.address)}
                      onChange={this.handlechange}
                    ></input>
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label htmlFor="mobile">Phone</label>
                    <input
                      type="number"
                      name="mobile"
                      className="form-control"
                      placeholder="Enter phone no."
                      value={(this, this.state.mobile)}
                      onChange={this.handlechange}
                    ></input>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      custom
                      value={this.state.gender}
                      onChange={this.handlechange}
                      name="gender"
                    >
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
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter username"
                        value={(this, this.state.username)}
                        onChange={this.handlechange}
                    ></input>
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <InputGroup className="mb-3">
                      <FormControl
                          type="password"
                          id="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handlechange}
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="basic-addon2"
                      />
                      <InputGroup.Append>
                        <Button onClick={this.passwordGen} variant="outline-secondary">GEN</Button>
                      </InputGroup.Append>
                    </InputGroup>
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
                    Update
                  </button>
                </Col>
              </Row>
              <Row className="text-center" style={{ margin: "5px" }}>
                <Col>
                  <Link
                    to={"/usercontrol/student"}
                    className="btn btn-outline-secondary btn-sm"
                    style={{ width: "40%" }}
                  >
                    Back
                  </Link>
                </Col>
              </Row>
            </Container>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EditStudent;
