import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Addita from "./addita";

const ITA = (props) => (
  <tr>
    <td>{props.ita.name}</td>
    <td>{props.ita.email}</td>
    <td>{props.ita.phone}</td>
    <td>{props.ita.company}</td>
    <td>{props.ita.username}</td>
    <td>{props.ita.password}</td>
    <td>
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
    axios
      .delete("http://localhost:5000/ita/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      ita: this.state.ita.filter((i) => i._id !== id),
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
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
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
            <tbody>{this.itaList()}</tbody>
          </table>
        </div>
        <Addita show={this.state.showpopup} onHide={popupclose} />
      </div>
    );
  }
}

export default userIta;
