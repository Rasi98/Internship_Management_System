import React, { Component } from "react";
import { Tab, Row, Col, ListGroup, Container } from "react-bootstrap";
import axios from "axios";
import Navbar from "./Navbar";

const Student = (props) => {
  <ListGroup.Item action href="#link1">
    {props.student.name}
  </ListGroup.Item>;
};

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentlist: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/student/")
      .then((Res) => {
        const response = Res.data;
        this.setState({ studentlist: response });

        //this.setState({ studentlist: Response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  studentList() {
    return this.state.studentlist.map((currentstudent) => {
      return <Student student={currentstudent} key={currentstudent._id} />;
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Navbar />
          <Container>
            <Row>
              <Col sm={4}>
                <ListGroup defaultActiveKey="#link1">
                  {this.studentList()}
                </ListGroup>
              </Col>
              <Col sm={8}>sm=4</Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default profile;
