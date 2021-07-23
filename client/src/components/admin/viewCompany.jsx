import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import {Button, Container, Row, Table} from "react-bootstrap";
import {CSVLink} from "react-csv";


const Company = (props) => (
  <tr className="text-center">
    <td>{props.company.name}</td>
    <td>{props.company.type}</td>
    <td>{props.company.email}</td>
    <td>{props.company.address}</td>
    <td>{props.company.phone}</td>
    <td>
      <Link
        to={"/admin/company/edit/" + props.company._id}
      >
        <Button className="btn-secondary m-1 btn-sm" style={{ width: "60px" }}>
          Edit
        </Button>
      </Link>
      <button
        className="btn btn-danger m-1 btn-sm"
        style={{ width: "60px" }}
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
      datalist:[]
    };
  }

  componentDidMount() {
    document.body.style='background: #E5E7E9;'
    let arry=[]
    axios
      .get("http://localhost:5000/company/")
      .then((Response) => {
        this.setState({ companies: Response.data });
        console.log(Response.data);
        if(Response.data.length!==0){
          Response.data.forEach((a)=>{
            const obj={
              Name:a.name,
              Email:a.email,
              Address:a.address,
              Phone:a.phone,
              Type:a.type
            }
            arry.push(obj)
          })
          this.setState({datalist:arry})
        }
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
          <h3 className="text-center" style={{marginBottom:"20px",fontFamily: 'Assistant'}}>
            Company List
          </h3>
          <Container>
            <Row style={{ float: "right", marginBottom: "10px" }}>
              <CSVLink data={this.state.datalist} style={{ margin: "2px", width: "80px" }} className="btn btn-sm btn-info"  filename={"CompanyList.csv"}>Download</CSVLink>
            </Row>
          </Container>

          <Table bordered hover>
            <thead style={{backgroundColor:'white'}}>
              <tr className="text-center">
                <th>Name</th>
                <th>Type</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody style={{backgroundColor:'white'}}>{this.companiesList()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Viewcompany;
