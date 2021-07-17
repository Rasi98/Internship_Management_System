import React, { Component } from "react";
import {Navbar, Nav, NavDropdown, Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import jwtDecode from "jwt-decode";

class Navbarstd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout=()=>{
    localStorage.clear();
    window.location="/";

  }
  render() {
    const jwt=localStorage.getItem("token")
    const name=jwtDecode(jwt).name;
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        // bg="dark"
        variant="dark"
        style={{ backgroundColor: "#283747 " }}
      >
        <img
          src="https://conf.kln.ac.lk/scse/images/Site/IM-LOGO.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          style={{ marginRight: "10px" }}
        />
        <Navbar.Brand href="#home">MIT | INTERNSHIP PORTAL</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/student/student">
              <Nav.Link>HOME</Nav.Link>
            </LinkContainer>
            <NavDropdown title="CV" id="collasible-nav-dropdown">
              <LinkContainer to="/student/profile">
                <NavDropdown.Item>MAKE/EDIT</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/student/preview/">
                <NavDropdown.Item>VIEW</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/student/interview">
              <Nav.Link>INTERVIEW</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/student/internship">
              <Nav.Link>INTERNSHIP</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/student/itasection">
              <Nav.Link>ITA</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/student">
              <Nav.Link>{name}</Nav.Link>
            </LinkContainer>
            <Button variant="outline-info" className="m-1" onClick={this.logout}>LOGOUT</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navbarstd;
