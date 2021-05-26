import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ITAA = (props) => (
  <tr>
    <td>{props.itaa.name}</td>
    <td>{props.itaa.email}</td>
    <td>{props.itaa.mobile}</td>
  </tr>
);

class userItaa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itaa: [],
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

  itaaList() {
    return this.state.itaa.map((currentitaa) => {
      return <ITAA itaa={currentitaa} key={currentitaa._id} />;
    });
  }

  render() {
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
              </tr>
            </thead>
            <tbody>{this.itaaList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default userItaa;
