import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link} from "react-router-dom";
import Navbar from "../Navbar";
import Swal from "sweetalert2";
import {Row, Col, Container, InputGroup, FormControl, Button} from "react-bootstrap";
import generator from "generate-password";


class Edititaa extends Component {
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

  componentDidMount() {
    document.body.style='background: #E5E7E9;'
    axios
      .get("http://localhost:5000/itaa/" + this.props.match.params.id)
      .then((Response) => {
        this.setState({
          name: Response.data.name,
          email: Response.data.email,
          phone: Response.data.phone,
          username: Response.data.username,
          password: Response.data.password,

        });
      });
  }
  handlechange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };


  handlesubmit = (e) => {
    const itaa = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      username: this.state.username,
      password: this.state.password,
    }

    axios.post(
        "http://localhost:5000/itaa/update/" + this.props.match.params.id,
        itaa
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
            this.props.history.push("/admin/usercontrol/itaa");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response,
            });
          }
        });
  }


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
          <h3 className="text-center">Edit ITAA</h3>
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
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      placeholder="Enter phone no."
                      value={(this, this.state.phone)}
                      onChange={this.handlechange}
                    ></input>
                  </div>
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
                      to={"/admin/usercontrol/itaa"}
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

export default Edititaa;
