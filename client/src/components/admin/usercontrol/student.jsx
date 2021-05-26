import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Student = (props) => (
  <tr>
    <td>{props.student.name}</td>
    <td>{props.student.stuno}</td>
    <td>{props.student.email}</td>
    <td>{props.student.dob}</td>
    <td>{props.student.address}</td>
    <td>{props.student.mobile}</td>
    <td>{props.student.gender}</td>
  </tr>
);

class userStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/student/")
      .then((Response) => {
        this.setState({ students: Response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  studentList() {
    return this.state.students.map((currentstudent) => {
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
                <th>Stu. No</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Gender</th>
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
