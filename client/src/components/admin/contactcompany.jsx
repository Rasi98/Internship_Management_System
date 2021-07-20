import React, { Component } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import {Row, Table,FormControl} from "react-bootstrap";
import {TextField} from "@material-ui/core";

const HRM = (props) => (
  <tr className='text-center'>
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
    this.hrmList=this.hrmList.bind(this)
    this.state = {
      hrm: [],
      input1:'',
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/hrm/")
      .then((Response) => {
        this.setState({ hrm: Response.data });
        console.log(Response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  contactCompany(obj) {
    const Status = obj.status;
    if (Status == "Not Contacted") {
      Swal.fire({
        title: "Are you sure want to contact?",
        text: "An email will send.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, contact!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Email sent!", "An email has been sent.", "success");
          const email = {
            email: obj.email,
            id: obj._id,
          };
          console.log(email);
          //email send
          axios
            .post("http://localhost:5000/hrm/contacthrm/" + email.id, email)
            .then((res) => {
              const response = res.data;
              console.log(response);
            });
          console.log(obj._id);
          //set status
          axios
            .get("http://localhost:5000/hrm/contacted/" + obj._id)
            .then((Response) => {
              console.log(Response);
              this.componentDidMount();
              //window.location = "/company/contact";
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    } else {
      Swal.fire({
        title: "Already contacted!",
        text: "Are you sure want send an email again?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, contact!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Email sent!", "An email has been sent.", "success");
          const email = {
            email: obj.email,
            id: obj._id,
          };
          console.log(email);
          //email send
          axios
            .post("http://localhost:5000/hrm/contacthrm/" + email.id, email)
            .then((res) => {
              const response = res.data;
              console.log(response);
            });
        }
      });
    }
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
          <h3 className="text-center" style={{marginBottom:"20px"}}>HRM List</h3>
          <Table bordered hover>
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Department</th>
                <th><span>Status</span><br/><div>
                  <TextField onChange={this.oninputchange} id="outlined-search" label="Filter" style={{marginTop:'8px',marginBottom:'2px'}} type="search" size="small" variant="outlined" />
                </div></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.hrmList()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Contactcompany;
