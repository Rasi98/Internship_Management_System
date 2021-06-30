import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import {Form,Container,Row,Col} from "react-bootstrap";


class Editcompany extends Component {
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
    axios
      .get("http://localhost:5000/company/" + this.props.match.params.id)
      .then((Response) => {
        this.setState({
          name: Response.data.name,
          email: Response.data.email,
          address: Response.data.address,
          phone: Response.data.phone,
          type:Response.data.type,
        });
      });
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
  handletypechange=(e)=>{
    this.setState({type:e.target.value});
  }

  handlesubmit = (e) => {
    //const history = useHistory();
    const company = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone,
      type:this.state.type,
    };

    axios
      .post(
        "http://localhost:5000/company/update/" + this.props.match.params.id,
        company
      )
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
            title: "Updated successfully",
          });
          this.props.history.push("/company/viewcompany");
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
  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h3 className="text-center">Edit company</h3>
          <form className="border" style={{ borderRadius: "10px" }}>
            <Container style={{ padding: "15px" }}>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="companyname">Company name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter company name"
                        value={(this, this.state.name)}
                        onChange={this.handlenamechange}
                    ></input>
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label htmlFor="companyemail">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter company email"
                        value={(this, this.state.email)}
                        onChange={this.handleemailchange}
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
                    <input
                        type="number"
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
                      to={"/company/viewcompany"}
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

export default Editcompany;
