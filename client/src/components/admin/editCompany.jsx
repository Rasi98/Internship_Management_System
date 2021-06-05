import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

class Editcompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      phone: "",
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

  handlesubmit = (e) => {
    const company = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone,
    };

    axios
      .post(
        "http://localhost:5000/company/update/" + this.props.match.params.id,
        company
      )
      .then((res) => {
        const response = res.data.result;

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
          window.location = "/company/viewcompany";
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
          <form>
            <div className="col-5">
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
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={this.handlesubmit}
              >
                Update
              </button>
              <Link
                to={"/company/viewcompany"}
                className="btn btn-outline-secondary btn-lg btn-block"
              >
                Back
              </Link>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Editcompany;
