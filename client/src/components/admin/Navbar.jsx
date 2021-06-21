import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class AdminNavbar extends Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        // bg="dark"
        variant="dark"
        style={{
          backgroundColor: "#283747 ",
        }}
      >
        <img
          src="https://conf.kln.ac.lk/scse/images/Site/IM-LOGO.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          style={{ marginRight: "10px" }}
        />
        <LinkContainer to="/admin">
          <Navbar.Brand>MIT | INTERNSHIP PORTAL</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="USERS" id="collasible-nav-dropdown">
              <LinkContainer to="/usercontrol/student">
                <NavDropdown.Item>STUDENT</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/usercontrol/itaa">
                <NavDropdown.Item>ITAA</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/usercontrol/ita">
                <NavDropdown.Item>ITA</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/usercontrol/hrm">
                <NavDropdown.Item>HRM</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/usercontrol/itpc">
                <NavDropdown.Item>ITPC</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/studentprofile/lakshan@gmail.com">
              <Nav.Link>STUDENT PROFILES</Nav.Link>
            </LinkContainer>
            <NavDropdown title="COMPANY" id="collasible-nav-dropdown">
              <LinkContainer to="/company/addcompany">
                <NavDropdown.Item>ADD</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/company/viewcompany">
                <NavDropdown.Item>VIEW</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/company/contact">
                <NavDropdown.Item>CONTACT</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title="ALLOCATE" id="collasible-nav-dropdown">
              <LinkContainer to="/allocate/company">
                <NavDropdown.Item>COMPANY</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/allocate/itaa">
                <NavDropdown.Item>ITAA</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/report">
              <Nav.Link>REPORTS</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/usercontrol/itpc">
              <Nav.Link>ADMINISTRATOR</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link>LOGOUT</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default AdminNavbar;
