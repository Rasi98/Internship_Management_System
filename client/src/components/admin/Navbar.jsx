import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar,NavDropdown,Nav} from 'react-bootstrap'
import {Link}from 'react-router-dom'

class AdminNavbar extends Component {
   
    render() { 
        return ( 
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Link to="/"><Navbar.Brand>MIT | Intership portal</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="USERS" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">student</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">ITAA</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">ITA</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">ITPC</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#pricing">STUDENT PROFILES</Nav.Link>
              <NavDropdown title="COMPANY" id="collasible-nav-dropdown">
                <Link to="/addcompany"> <NavDropdown.Item href="/addcompany">Add</NavDropdown.Item></Link>
                <Link to="/viewcompany"><NavDropdown.Item href="/viewcompany">View</NavDropdown.Item></Link>
              </NavDropdown>
              <NavDropdown title="ALLOCATE" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Company</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">ITAA</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#pricing">REPORTS</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Administrator</Nav.Link>
              <Nav.Link eventKey={2} href="">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
         );
    }
}
 
export default AdminNavbar;