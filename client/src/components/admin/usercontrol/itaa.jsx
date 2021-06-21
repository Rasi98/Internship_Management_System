import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import Additaa from "./additaa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ITAA = (props) => (
  <tr className="text-center">
    <td>{props.itaa.name}</td>
    <td>{props.itaa.email}</td>
    <td>{props.itaa.phone}</td>
    <td>{props.itaa.username}</td>
    <td>
      <Link to={"/usercontrol/itaa/edit/" + props.itaa._id}>
        <Button className="btn-secondary m-1 btn-sm" style={{ width: "60px" }}>
          Edit
        </Button>
      </Link>
      <Button
        className="btn btn-danger m-1 btn-sm"
        style={{ width: "60px" }}
        onClick={() => {
          props.deleteitaa(props.itaa._id);
        }}
      >
        Delete
      </Button>
    </td>
  </tr>
);

class userItaa extends Component {
  constructor(props) {
    super(props);

    this.deleteitaa = this.deleteitaa.bind(this);

    this.state = {
      itaa: [],
      showpopup: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/itaa/")
      .then((Response) => {
        this.setState({ itaa: Response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteitaa(id) {
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
        //Swal.fire("Deleted!", "ITAA has been deleted.", "success");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Deleted!",
        });
        axios
          .delete("http://localhost:5000/itaa/" + id)
          .then((res) => console.log(res.data));
        this.setState({
          itaa: this.state.itaa.filter((i) => i._id !== id),
        });
      }
    });
  }

  itaaList() {
    return this.state.itaa.map((currentitaa) => {
      return (
        <ITAA
          itaa={currentitaa}
          deleteitaa={this.deleteitaa}
          key={currentitaa._id}
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
          <h3 className="text-center">ITAA List</h3>
          <Container>
            <Row style={{ float: "right", marginBottom: "15px" }}>
              <Col>
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
                  variant="danger"
                >
                  Delete all
                </Button>
              </Col>
            </Row>
          </Container>
          <Table bordered hover>
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Username</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.itaaList()}</tbody>
          </Table>
        </div>
        <Additaa show={this.state.showpopup} onHide={popupclose} />
      </div>
    );
  }
}

export default userItaa;
