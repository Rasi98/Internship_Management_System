import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Addita from "./addita";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ITA = (props) => (
  <tr>
    <td>{props.ita.name}</td>
    <td>{props.ita.designation}</td>
    <td>{props.ita.email}</td>
    <td>{props.ita.phone}</td>
    <td>{props.ita.company}</td>
    <td>{props.ita.username}</td>
    <td>{props.ita.password}</td>
    <td>
      <Link
        to={"/usercontrol/ita/edit/" + props.ita._id}
        className="btn btn-info m-1"
      >
        Edit
      </Link>
      <button
        className="btn btn-danger m-1"
        onClick={() => {
          props.deleteita(props.ita._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

class userIta extends Component {
  constructor(props) {
    super(props);
    this.deleteita = this.deleteita.bind(this);

    this.state = {
      ita: [],
      showpopup: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/ita/")
      .then((Response) => {
        this.setState({ ita: Response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteita(id) {
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
        Swal.fire("Deleted!", "ITA has been deleted.", "success");
        axios
          .delete("http://localhost:5000/ita/" + id)
          .then((res) => console.log(res.data));
        this.setState({
          ita: this.state.ita.filter((i) => i._id !== id),
        });
      }
    });
  }

  itaList() {
    return this.state.ita.map((currentita) => {
      return (
        <ITA ita={currentita} deleteita={this.deleteita} key={currentita._id} />
      );
    });
  }

  render() {
    let popupclose = () => this.setState({ showpopup: false });

    return (
      <div>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h3 className="text-center">ITA List</h3>
          <table className="table text-center">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Username</th>
                <th>Password</th>
                <th>Action</th>
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
            <tbody>{this.itaList()}</tbody>
          </table>
        </div>
        <Addita show={this.state.showpopup} onHide={popupclose} />
      </div>
    );
  }
}

export default userIta;
