import React, { Component } from "react";
import {Navbar, Nav, Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import jwtDecode from "jwt-decode";

class Navbaritaa extends Component {
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
                    </Nav>
                    <Nav>
                        <LinkContainer to="/itaa">
                            <Nav.Link>{name}</Nav.Link>
                        </LinkContainer>
                        <Button variant="outline-info" className="m-1" onClick={this.logout}>LOGOUT</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navbaritaa;
