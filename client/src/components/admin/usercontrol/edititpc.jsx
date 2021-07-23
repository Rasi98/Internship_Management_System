import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Swal from "sweetalert2";

class Edititpc extends Component {
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
      .get("http://localhost:5000/itpc/" + this.props.match.params.id)
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
    //const history = useHistory();
    const itpc = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post(
        "http://localhost:5000/itpc/update/" + this.props.match.params.id,
        itpc
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
          this.props.history.push("/admin/usercontrol/itpc");

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
          <h3 className="text-center">Edit ITPC</h3>
          <form>
            <div className="col-5">
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
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter company email"
                  value={(this, this.state.email)}
                  onChange={this.handlechange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  placeholder="Enter company address"
                  value={(this, this.state.phone)}
                  onChange={this.handlechange}
                ></input>
              </div>
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
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={(this, this.state.password)}
                  onChange={this.handlechange}
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
                to={"/admin/usercontrol/itpc"}
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

export default Edititpc;
