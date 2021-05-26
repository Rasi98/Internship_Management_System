import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

class userITPC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itpc: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/itpc/")
      .then((Response) => {
        this.setState({ itpc: Response.data });
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <h1>ITPC</h1>
        <div className="row d-flex justify-content-center">
          <Card style={{ width: "20rem", position: "absolute" }}>
            <div className="text-center">
              <Card.Img
                variant="top"
                src="https://reactivitymedia.com/wp-content/uploads/2014/08/professional-woman-5.jpg"
                style={{ width: "15rem", position: "relative" }}
              />
            </div>
            <Card.Body>
              <Card.Title>{this.state.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Email : {this.state.email}</ListGroupItem>
              <ListGroupItem>Phone : {this.state.phone}</ListGroupItem>
              <ListGroupItem>Username : {this.state.username}</ListGroupItem>
              <ListGroupItem>Password : {this.state.password}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#" style={{ float: "right" }}>
                Edit
              </Card.Link>
              <Card.Link href="#" style={{ float: "left" }}>
                Delete
              </Card.Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default userITPC;
