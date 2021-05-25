import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

class AdminNavbar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link to="/admin">
          <Navbar.Brand>MIT | Intership portal</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="USERS" id="collasible-nav-dropdown">
              <Link to="/usercontrol/student">
                <NavDropdown.Item href="#action/3.1">student</NavDropdown.Item>
              </Link>
              <Link to="/usercontrol/itaa">
                <NavDropdown.Item href="#action/3.2">ITAA</NavDropdown.Item>
              </Link>
              <Link to="/usercontrol/ita">
                <NavDropdown.Item href="#action/3.3">ITA</NavDropdown.Item>
              </Link>
              <Link to="/usercontrol/itpc">
                <NavDropdown.Item href="#action/3.3">ITPC</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <Link to="/studentprofile">
              <Nav.Link href="/studentprofile">STUDENT PROFILES</Nav.Link>
            </Link>
            <NavDropdown title="COMPANY" id="collasible-nav-dropdown">
              <Link to="/company/addcompany">
                {" "}
                <NavDropdown.Item href="/company/addcompany">
                  Add
                </NavDropdown.Item>
              </Link>
              <Link to="/company/viewcompany">
                <NavDropdown.Item href="/company/viewcompany">
                  View
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
            <NavDropdown title="ALLOCATE" id="collasible-nav-dropdown">
              <Link to="/allocate/company">
                <NavDropdown.Item href="/allocate/company">
                  Company
                </NavDropdown.Item>
              </Link>
              <Link to="/allocate/itaa">
                <NavDropdown.Item href="/allocate/itaa">ITAA</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <Link to="/report">
              <Nav.Link href="#pricing">REPORTS</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Administrator</Nav.Link>
            <Link to="/">
              {" "}
              <Nav.Link href="/">Logout</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default AdminNavbar;
