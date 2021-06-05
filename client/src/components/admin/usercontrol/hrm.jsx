import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Addhrm from "./addhrm";

const HRM = (props) => (
  <tr>
    <td>{props.hrm.name}</td>
    <td>{props.hrm.designation}</td>
    <td>{props.hrm.email}</td>
    <td>{props.hrm.phone}</td>
    <td>{props.hrm.company}</td>
    <td>{props.hrm.department}</td>
    <td>
      <button
        className="btn btn-danger m-1"
        onClick={() => {
          props.deletehrm(props.hrm._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

class userHrm extends Component {
  constructor(props) {
    super(props);
    this.deletehrm = this.deletehrm.bind(this);

    this.state = {
      hrm: [],
      showpopup: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/hrm/")
      .then((Response) => {
        this.setState({ hrm: Response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deletehrm(id) {
    axios
      .delete("http://localhost:5000/hrm/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      hrm: this.state.hrm.filter((i) => i._id !== id),
    });
  }

  hrmList() {
    return this.state.hrm.map((currenthrm) => {
      return (
        <HRM hrm={currenthrm} deletehrm={this.deletehrm} key={currenthrm._id} />
      );
    });
  }

  render() {
    let popupclose = () => this.setState({ showpopup: false });

    return (
      <div>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h3 className="text-center">HRM List</h3>
          <table className="table text-center">
            <thead className="thead-light ">
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Department</th>
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
            <tbody>{this.hrmList()}</tbody>
          </table>
        </div>
        <Addhrm show={this.state.showpopup} onHide={popupclose} />
      </div>
    );
  }
}

export default userHrm;
