import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Navbarstd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">MIT | INTERNSHIP PORTAL</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/profile">
              <Nav.Link>PROFILE</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/interview">
              <Nav.Link>INTERVIEW</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/internship">
              <Nav.Link>INTERNSHIP</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/">
              <Nav.Link>LOGOUT</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navbarstd;
