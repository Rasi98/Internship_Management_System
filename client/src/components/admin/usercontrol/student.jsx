import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Student = (props) => (
  <tr>
    <td>{props.student.name}</td>
    <td>{props.student.username}</td>
    <td>{props.student.password}</td>
  </tr>
);

class userStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      credentials: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/user/")
      .then((Response) => {
        this.setState({
          credentials: Response.data,
        });
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  studentList() {
    return this.state.credentials.map((currentstudent) => {
      return <Student student={currentstudent} key={currentstudent._id} />;
    });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h3 className="text-center">Student List</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>{this.studentList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default userStudent;
