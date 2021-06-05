import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Addstudent from "./addstudent";

const Student = (props) => (
  <tr>
    <td>{props.student.name}</td>
    <td>{props.student.stuno}</td>
    <td>{props.student.email}</td>
    <td>{props.student.dob}</td>
    <td>{props.student.address}</td>
    <td>{props.student.mobile}</td>
    <td>{props.student.gender}</td>
    <td>
      <button
        className="btn btn-danger m-1"
        onClick={() => {
          props.deletestu(props.student._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

class userStudent extends Component {
  constructor(props) {
    super(props);

    this.deleteStudent = this.deleteStudent.bind(this);
    this.state = {
      showpopup: false,
      studentlist: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/student/")
      .then((Response) => {
        this.setState({ studentlist: Response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteStudent(id) {
    axios
      .delete("http://localhost:5000/student/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      studentlist: this.state.studentlist.filter((i) => i._id !== id),
    });
  }

  studentList() {
    return this.state.studentlist.map((currentstudent) => {
      return (
        <Student
          student={currentstudent}
          deletestu={this.deleteStudent}
          key={currentstudent._id}
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
          <h3 className="text-center">Student List</h3>
          <table className="table text-center">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Stu. No</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Gender</th>
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
            <tbody>{this.studentList()}</tbody>
          </table>
        </div>
        <Addstudent show={this.state.showpopup} onHide={popupclose} />
      </div>
    );
  }
}

export default userStudent;
