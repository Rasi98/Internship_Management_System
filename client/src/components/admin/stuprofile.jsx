import React, { Component } from "react";
import { Tab, Row, Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import Navbar from "./Navbar";

const Student = (props) => {
  <ListGroup.Item action href="#link1">
    {this.student.name}
  </ListGroup.Item>;
};

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/student/")
      .then((Response) => {
        this.setState({ students: Response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  studentList() {
    return this.state.student.map((currentstudent) => {
      return <Student student={currentstudent} key={currentstudent._id} />;
    });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup>{this.studentList()}</ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  <p>hello</p>
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  <p>hello</p>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default profile;
