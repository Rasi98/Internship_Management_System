import React, { Component } from "react";
import Navbar from "../Navbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Additpc from "./additpc";
import Edititpc from "./edititpc";

//Card component
const Itpc = (props) => (
  <Card style={{ width: "20rem", position: "relative", margin: "auto" }}>
    <div className="text-center">
      <Card.Img
        variant="top"
        src="https://reactivitymedia.com/wp-content/uploads/2014/08/professional-woman-5.jpg"
        style={{ width: "15rem", position: "relative" }}
      />
    </div>
    <Card.Body>
      <Card.Title>{props.itpc.name}</Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem>Email : {props.itpc.email}</ListGroupItem>
      <ListGroupItem>Phone : {props.itpc.phone}</ListGroupItem>
      <ListGroupItem>Username : {props.itpc.username}</ListGroupItem>
      <ListGroupItem>Password : {props.itpc.password}</ListGroupItem>
      <ListGroupItem>ID : {props.itpc._id}</ListGroupItem>
    </ListGroup>
    <button
      className="btn btn-info m-1"
      onClick={() => {
        props.seteditstate(props.itpc);
      }}
    >
      Edit
    </button>
    <button
      className="btn btn-danger m-1"
      onClick={() => {
        props.deleteItpc(props.itpc._id);
      }}
    >
      Delete
    </button>
  </Card>
);

class userITPC extends Component {
  constructor(props) {
    super(props);

    this.deleteItpc = this.deleteItpc.bind(this);
    this.seteditstate = this.seteditstate.bind(this);
    this.state = {
      itpc: [],
      showpopup: false,
      showeditpopup: false,
      current: {},
    };
  }

  seteditstate(obj) {
    this.setState({ showeditpopup: true });
    this.setState({ current: obj });
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

  deleteItpc(id) {
    axios
      .delete("http://localhost:5000/itpc/" + id)
      .then((res) => console.log(res));
    this.setState({
      itpc: this.state.itpc.filter((el) => el._id !== id),
    });
  }

  itpcList() {
    return this.state.itpc.map((currentitpc) => {
      return (
        <Itpc
          itpc={currentitpc}
          deleteItpc={this.deleteItpc}
          seteditstate={this.seteditstate}
          key={currentitpc._id}
        />
      );
    });
  }

  render() {
    let popupclose = () => this.setState({ showpopup: false });
    let editpopupclose = () => this.setState({ showeditpopup: false });

    return (
      <div>
        <Navbar></Navbar>
        <div className="container mt-4">
          <Fab color="primary" aria-label="add" size="medium">
            <AddIcon onClick={() => this.setState({ showpopup: true })} />
          </Fab>
          <h2 className="text-center m-3" style={{ fontSize: "1.5rem" }}>
            Internship Placement Coordinators
          </h2>
          <div className="row d-flex justify-content-center">
            {this.itpcList()}
          </div>
          <Additpc show={this.state.showpopup} onHide={popupclose} />
          <Edititpc
            show={this.state.showeditpopup}
            data={this.state.current}
            onHide={editpopupclose}
          />
        </div>
      </div>
    );
  }
}

export default userITPC;
