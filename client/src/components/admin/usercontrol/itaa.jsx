import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Additaa from "./additaa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ITAA = (props) => (
  <tr>
    <td>{props.itaa.name}</td>
    <td>{props.itaa.email}</td>
    <td>{props.itaa.phone}</td>
    <td>{props.itaa.username}</td>
    <td>{props.itaa.password}</td>
    <td>
      <Link
        to={"/usercontrol/itaa/edit/" + props.itaa._id}
        className="btn btn-info m-1"
      >
        Edit
      </Link>
      <button
        className="btn btn-danger m-1"
        onClick={() => {
          props.deleteitaa(props.itaa._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

class userItaa extends Component {
  constructor(props) {
    super(props);

    this.deleteitaa = this.deleteitaa.bind(this);

    this.state = {
      itaa: [],
      showpopup: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/itaa/")
      .then((Response) => {
        this.setState({ itaa: Response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteitaa(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "ITAA has been deleted.", "success");
        axios
          .delete("http://localhost:5000/itaa/" + id)
          .then((res) => console.log(res.data));
        this.setState({
          itaa: this.state.itaa.filter((i) => i._id !== id),
        });
      }
    });
  }

  itaaList() {
    return this.state.itaa.map((currentitaa) => {
      return (
        <ITAA
          itaa={currentitaa}
          deleteitaa={this.deleteitaa}
          key={currentitaa._id}
        />
      );
    });
  }

  render() {
    let popupclose = () => this.setState({ showpopup: false });

    return (
      <div>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h3 className="text-center">ITAA List</h3>
          <table className="table text-center">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
                <th>
                  <Button
                    variant="primary"
                    onClick={() => {
                      this.setState({ showpopup: true });
                    }}
                  >
                    Add
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>{this.itaaList()}</tbody>
          </table>
        </div>
        <Additaa show={this.state.showpopup} onHide={popupclose} />
      </div>
    );
  }
}

export default userItaa;
