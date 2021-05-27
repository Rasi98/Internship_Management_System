import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ITA = (props) => (
  <tr>
    <td>{props.ita.name}</td>
    <td>{props.ita.email}</td>
    <td>{props.ita.phone}</td>
    <td>{props.ita.company}</td>
    <td>{props.ita.username}</td>
    <td>{props.ita.password}</td>
  </tr>
);

class userIta extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ita: [],
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

  itaList() {
    return this.state.ita.map((currentita) => {
      return <ITA ita={currentita} key={currentita._id} />;
    });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h3 className="text-center">ITA List</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>{this.itaList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default userIta;
