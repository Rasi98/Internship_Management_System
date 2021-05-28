import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Additaa from "./additaa";

const ITAA = (props) => (
  <tr>
    <td>{props.itaa.name}</td>
    <td>{props.itaa.email}</td>
    <td>{props.itaa.phone}</td>
    <td>{props.itaa.username}</td>
    <td>{props.itaa.password}</td>
    <td>
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
    axios
      .delete("http://localhost:5000/itaa/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      itaa: this.state.itaa.filter((i) => i._id !== id),
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
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Username</th>
                <th>Password</th>
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
