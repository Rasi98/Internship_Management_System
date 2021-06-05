import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const HRM = (props) => (
  <tr>
    <td>{props.hrm.name}</td>
    <td>{props.hrm.designation}</td>
    <td>{props.hrm.email}</td>
    <td>{props.hrm.phone}</td>
    <td>{props.hrm.company}</td>
    <td>{props.hrm.department}</td>
    <td>{props.hrm.status}</td>
    <td>
      <button
        className="btn btn-success m-1"
        onClick={() => {
          props.contactCompany(props.hrm);
        }}
      >
        Contact
      </button>
    </td>
  </tr>
);

class Contactcompany extends Component {
  constructor(props) {
    super(props);
    this.contactCompany = this.contactCompany.bind(this);

    this.state = {
      hrm: [],
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

  contactCompany(obj) {
    //Need to pass company name & email

    // const email = {
    //   email: obj.email,
    //   name: obj.name,
    // };
    const email = {
      email: obj.email,
      id: obj._id,
    };
    console.log(email);
    axios
      .post("http://localhost:5000/hrm/contacthrm/" + email.id, email)
      .then((res) => {
        const response = res.data;
        console.log(response);
        if (response == "sent") alert("Email sent!");
        else alert("Error occured!");
      });
  }

  hrmList() {
    return this.state.hrm.map((currenthrm) => {
      return (
        <HRM
          hrm={currenthrm}
          contactCompany={this.contactCompany}
          key={currenthrm._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Navbar />
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
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.hrmList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Contactcompany;
