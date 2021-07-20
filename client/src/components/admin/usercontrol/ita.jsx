import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {Button, Container, Row, Col, Table, FormControl} from "react-bootstrap"
import Addita from "./addita";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ITA = (props) => (
  <tr className="text-center">
    <td>{props.ita.name}</td>
    <td>{props.ita.designation}</td>
    <td>{props.ita.email}</td>
    <td>{props.ita.phone}</td>
    <td>{props.ita.company}</td>
    <td>{props.ita.stuname}</td>
    <td>
      <Link
        to={"/admin/usercontrol/ita/edit/" + props.ita._id}
      >
        <Button className="btn-secondary m-1 btn-sm" style={{ width: "60px" }}>
          Edit
        </Button>
      </Link>
      <Button
        className="btn btn-danger m-1 btn-sm"
        style={{ width: "60px" }}
        onClick={() => {
          props.deleteita(props.ita._id);
        }}
      >
        Delete
      </Button>
    </td>
  </tr>
);

class userIta extends Component {
  constructor(props) {
    super(props);
    this.deleteita = this.deleteita.bind(this);
    this.deleteall=this.deleteall.bind(this);

    this.state = {
      ita: [],
      showpopup: false,
      searchbox:''
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
        Swal.fire("Deleted!", "ITA has been deleted.", "success");
        axios
          .delete("http://localhost:5000/ita/" + id)
          .then((res) => console.log(res.data));
        this.setState({
          ita: this.state.ita.filter((i) => i._id !== id),
        });
      }
    });
  }

  itaList() {
    return this.state.ita.filter((val)=>{
      if(this.state.searchbox==""){
        return val
      }
      else if(val.name.toLowerCase().includes(this.state.searchbox.toLowerCase())){
        return val
      }
    }).map((currentita) => {
      return (
        <ITA ita={currentita} deleteita={this.deleteita} key={currentita._id} />
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
        axios.post("http://localhost:5000/ita/deleteall")
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
    let popupclose = () => this.setState({ showpopup: false });

    return (
      <div>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h3 className="text-center">ITA List</h3>
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
                <Button
                    className="btn-sm"
                    style={{ margin: "2px", width: "80px" }}
                    onClick={this.deleteall}
                    variant="danger"
                >
                  Delete all
                </Button>
            </Row>
          </Container>
          <Table bordered hover>
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Intern</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.itaList()}</tbody>
          </Table>
        </div>
        <Addita show={this.state.showpopup} onHide={popupclose} />
      </div>
    );
  }
}

export default userIta;
