import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button,Container,Row,Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import {Form} from "react-bootstrap";
import {Paper} from "@material-ui/core";

class Addcompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      phone: "",
      type:"",
    };
  }

  componentDidMount() {
    document.body.style='background: #E5E7E9;'
  }

  handlenamechange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleemailchange = (e) => {
    this.setState({ email: e.target.value });
  };
  handleaddresschange = (e) => {
    this.setState({ address: e.target.value });
  };
  handlephonechange = (e) => {
    this.setState({ phone: e.target.value });
  };
  handletypechange = (e) => {
    this.setState({ type: e.target.value });
  };

  handlesubmit = (e) => {
    const company = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone,
      type:this.state.type,
    };

    axios
      .post("http://localhost:5000/company/addcompany", company)
      .then((res) => {
        const response = res.data.result;
        console.log(response);

        if (response == "success") {
          console.log("success");
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
            title: "Company added successfully",
          });
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
      email: "",
      address: "",
      phone: "",
      type:"",
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h3 className="text-center my-3 mb-3" style={{fontFamily: 'Assistant'}}>Add Company</h3>
          <Paper elevation={3} className='mx-3 my-2' style={{padding:'1px'}}>
          <form  style={{ backgroundColor:'white' }}>
            <Container style={{ padding: "15px" }}>
              <Row>
                <Col>
                  <div className="form-group">
                  <label htmlFor="companyname">Company name</label>
                  <input
                      type="text"
                      id="companyName"
                      className="form-control"
                      placeholder="Enter company name"
                      value={(this, this.state.name)}
                      onChange={this.handlenamechange}
                      required
                  ></input>
                </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label htmlFor="companyemail">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter company email"
                        value={(this, this.state.email)}
                        onChange={this.handleemailchange}
                        required
                    ></input>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="companyaddress">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter company address"
                        value={(this, this.state.address)}
                        onChange={this.handleaddresschange}
                    ></input>
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label htmlFor="companymobile">Phone No</label>
                    <br></br>
                    <input
                        type="number"
                        maxLength="10"
                        id="companyPhone"
                        className="form-control"
                        placeholder="Enter phone no."
                        value={(this, this.state.phone)}
                        onChange={this.handlephonechange}
                    ></input>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <Form.Group controlId="exampleForm.SelectCustom">
                      <Form.Label>Company Type</Form.Label>
                      <Form.Control
                          as="select"
                          custom
                          value={this.state.type}
                          onChange={this.handletypechange}
                          name="type"
                      >
                        <option value="" selected disabled hidden>Choose here</option>
                        <option value={"IT"}>IT</option>
                        <option value={"Management"}>Management</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <Row  className="text-center" style={{ margin: "5px" }}>
                <Col>
                  <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ width: "40%" }}
                      onClick={this.handlesubmit}
                  >
                    Submit
                  </button>
                </Col>
              </Row>
              <Row  className="text-center" style={{ margin: "5px" }}>
                <Col>
                  <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={this.handleClear}
                      style={{ width: "40%" }}
                  >
                    Reset
                  </button>
                </Col>
              </Row>
            </Container>
          </form>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default Addcompany;
