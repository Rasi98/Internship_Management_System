import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import jwtDecode from "jwt-decode";
import MailIcon from "@material-ui/icons/Mail";
import Badge from "@material-ui/core/Badge";
import Messegemodel from "./messegemodel";
import axios from "axios";

class Navbarstd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showpopup: false,
      batch: "",
      past: "",
      new: "",
      comment: [],
      newmsg: "",
    };
  }

  componentDidMount() {
    this.getmsg();
  }

  getmsg() {
    const jwt = localStorage.getItem("token");
    const stuid = jwtDecode(jwt)._id;
    const stuId = {
      id: stuid,
    };
    axios
      .post("http://localhost:5000/studentprofile/get", stuId)
      .then((res) => {
        console.log("test", res.data.msg);
        // if (res.data.msg === "no") {
        //   this.setState({ batch: 0 });
        // } else {
        //   res.data.msg.forEach((item) => {
        //     this.setState({
        //       past: item.pastlength,
        //       new: item.newlength,
        //       comment: item.comment,
        //     });
        //   });
          if (res.status === 200) {
            res.data.msg.forEach((item) => {
              this.setState({
                past: item.pastlength,
                new: item.newlength,
                comment: item.comment,
              });
          })
            const newmsg = parseInt(this.state.new) - parseInt(this.state.past);
            console.log("diff", newmsg);
            if (newmsg === 0) {
              this.setState({ batch: 0 });
            } else {
              this.setState({ batch: newmsg });
            }
          }
          else
          {
            this.setState({ batch: 0 });
          }
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }

  onIconclick=()=>{
    if(this.state.batch==="0"){
      this.setState({ showpopup: true });
    }
    else if(this.state.batch===""){
      this.setState({ showpopup: true });
    }else{
      this.setState({ showpopup: true });
      this.setState({batch:0,past:this.state.new})
      const jwt = localStorage.getItem("token");
      const stuid = jwtDecode(jwt)._id;
      const obj = {
        id: stuid,
        newlength:this.state.new
      };
      axios.post("http://localhost:5000/student/readcomment",obj)
          .then((res)=>{
            console.log(res)
          })
    }
  }

  logout = () => {
    localStorage.clear();
    window.location = "/";
  };
  render() {
    let popupclose = () => this.setState({ showpopup: false });
    const jwt = localStorage.getItem("token");
    const name = jwtDecode(jwt).name;
    const stuid = jwtDecode(jwt)._id;
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
              <LinkContainer to={"/student/preview/" + stuid}>
                <NavDropdown.Item>VIEW</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/student/interview">
              <Nav.Link>INTERVIEW</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Badge
              className="mt-2 mr-2"
              badgeContent={this.state.batch}
              color="error"
            >
              <MailIcon
                cursor="pointer"
                onClick={this.onIconclick}
                style={{ color: "white" }}
              />
            </Badge>
            <LinkContainer to="/student">
              <Nav.Link className="mr-1">{name}</Nav.Link>
            </LinkContainer>
            <Button
              variant="outline-info"
              className="m-1"
              onClick={this.logout}
            >
              LOGOUT
            </Button>
          </Nav>
        </Navbar.Collapse>
        <Messegemodel show={this.state.showpopup} onHide={popupclose} />
      </Navbar>
    );
  }
}

export default Navbarstd;
