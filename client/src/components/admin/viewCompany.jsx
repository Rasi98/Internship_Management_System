import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const Company = (props) => (
  <tr>
    <td>{props.company.name}</td>
    <td>{props.company.email}</td>
    <td>{props.company.address}</td>
    <td>{props.company.phone}</td>

    <td>
      <Link
        to={"/company/edit/" + props.company._id}
        className="btn btn-warning m-1"
      >
        edit
      </Link>
      <button
        className="btn btn-danger m-1"
        onClick={() => {
          props.deleteCompany(props.company._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

class Viewcompany extends Component {
  constructor(props) {
    super(props);

    this.deleteCompany = this.deleteCompany.bind(this);
    this.state = {
      companies: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/company/")
      .then((Response) => {
        this.setState({ companies: Response.data });
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCompany(id) {
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
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        axios
          .delete("http://localhost:5000/company/" + id)
          .then((res) => console.log(res.data));
        this.setState({
          companies: this.state.companies.filter((el) => el._id !== id),
        });
      }
    });
  }

  companiesList() {
    return this.state.companies.map((currentcompany) => {
      return (
        <Company
          company={currentcompany}
          deleteCompany={this.deleteCompany}
          key={currentcompany._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h2 className="text-center m-3" style={{ fontSize: "1.5rem" }}>
            Company List
          </h2>
          <table className="table text-center">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.companiesList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Viewcompany;
