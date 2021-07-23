import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {Button, Container, Row, Col, Table, FormControl} from "react-bootstrap";
import { Link } from "react-router-dom";
import Addhrm from "./addhrm";
import Swal from "sweetalert2";
import {CSVLink} from "react-csv";


const HRM = (props) => (
  <tr className="text-center">
    <td>{props.hrm.name}</td>
    <td>{props.hrm.designation}</td>
    <td>{props.hrm.email}</td>
    <td>{props.hrm.phone}</td>
    <td>{props.hrm.company}</td>
    <td>{props.hrm.department}</td>
    <td>
      <Link
        to={"/admin/usercontrol/hrm/edit/" + props.hrm._id}>
        <Button className="btn-secondary m-1 btn-sm" style={{ width: "60px" }}>
          Edit
        </Button>
      </Link>
      <button
        className="btn btn-danger m-1 btn-sm"
        style={{ width: "60px" }}
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
    this.deleteall=this.deleteall.bind(this);
    this.state = {
      hrm: [],
      showpopup: false,
      searchbox:'',
      datalist:[]
    };
  }

  componentDidMount() {
    document.body.style='background: #E5E7E9;'
    let arry=[]
    axios
      .get("http://localhost:5000/hrm/")
      .then((Response) => {
        this.setState({ hrm: Response.data });
        console.log(Response.data)
        if(Response.data.length!==0){
          Response.data.forEach((item)=>{
            const obj={
              Name:item.name,
              Email:item.email,
              Phone:item.phone,
              Company:item.company,
              Department:item.department,
              Position:item.designation
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

  deletehrm(id) {
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
        Swal.fire("Deleted!", "HRM has been deleted.", "success");
        axios
          .delete("http://localhost:5000/hrm/" + id)
          .then((res) => console.log(res.data));
        this.setState({
          hrm: this.state.hrm.filter((i) => i._id !== id),
        });
      }
    });
  }

  hrmList() {
    return this.state.hrm.filter((val)=>{
      if(this.state.searchbox==""){
        return val
      }
      else if(val.name.toLowerCase().includes(this.state.searchbox.toLowerCase())){
        return val
      }
    }).map((currenthrm) => {
      return (
        <HRM hrm={currenthrm} deletehrm={this.deletehrm} key={currenthrm._id} />
      );
    });
  }

  //Delete all data
  deleteall(){
    Swal.fire({
      title: 'Are you sure?',
      text: "All data will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete all!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://localhost:5000/hrm/deleteall")
            .then((res)=>{
              const response=res.data;
              if(response=="success"){
                this.componentDidMount()
                Swal.fire(
                    'Deleted!',
                    'All data has been deleted.',
                    'success'
                )
              }
              else{
                this.componentDidMount();
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                })
              }
            })
      }
    })
  }

  render() {
    let popupclose = () => {
      this.setState({showpopup: false})
      this.componentDidMount()
    };

    return (
      <div>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h3 style={{fontFamily: 'Assistant'}}>HR Manager</h3>
          <Container>
            <Row style={{ float: "right", marginBottom: "15px" }}>
              <Col>
                <FormControl size="sm" type="searchbox" placeholder="Search..." onChange={(e)=>{this.setState({searchbox:e.target.value})}} />
              </Col>
                <Button
                    className="btn-sm"
                    style={{ margin: "2px", width: "80px" }}
                    variant="primary"
                    onClick={() => {
                      this.setState({ showpopup: true });
                    }}
                >
                  Add
                </Button>
              <CSVLink data={this.state.datalist} style={{ margin: "2px", width: "80px" }} className="btn btn-sm btn-info"  filename={"ContactPersonList.csv"}>Download</CSVLink>
              <Button
                    className="btn-sm"
                    style={{ margin: "2px", width: "80px" }}
                    variant="danger"
                    onClick={this.deleteall}
                >
                  Delete all
                </Button>
            </Row>
          </Container>
          <Table bordered hover>
            <thead style={{backgroundColor:'white'}}>
              <tr className="text-center">
                <th>Name</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{backgroundColor:'white'}}>{this.hrmList()}</tbody>
          </Table>
        </div>
        <Addhrm show={this.state.showpopup} onHide={popupclose} backdrop="static" />
      </div>
    );
  }
}

export default userHrm;
