import React, { Component } from "react";
import {Modal, Button, Container, Row, Col, InputGroup, FormControl, Form} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import generator from "generate-password";

class Addita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      designation: "",
      email: "",
      phone: "",
      company: "",
      username: "",
      password: "",
      stuname:"",
      stuid:"",
      stuarry:[]
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/student/")
        .then((res) => {
          console.log("res",res)
          let arry=[]
          res.data.forEach((a)=>{
            if(a.selectedCompany!==""){
              arry.push(a)
            }
          })
          this.setState({stuarry:arry})
          console.log("arry",this.state.stuarry)
        })
        .catch((err) => {
          console.log(err)
        })
  }

  handlenamechange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleemailchange = (e) => {
    this.setState({ email: e.target.value });
  };
  handledesignationchange = (e) => {
    this.setState({ designation: e.target.value });
  };
  handlephonechange = (e) => {
    this.setState({ phone: e.target.value });
  };
  handleusernamechange = (e) => {
    this.setState({ username: e.target.value });
  };
  handlepasswordchange = (e) => {
    this.setState({ password: e.target.value });
  };
  handlestudentchange=(e)=>{
    const stuid=e.target.value;
    const com = document.getElementById("drop");
    const strUser = com.options[com.selectedIndex].text;
    this.setState({stuname:strUser,stuid:stuid})
  };
  handlecompanychange = (e) => {
    this.setState({ company: e.target.value });
  };


  handlesubmit = (e) => {
    const ita = {
      name: this.state.name,
      designation: this.state.designation,
      email: this.state.email,
      phone: this.state.phone,
      company: this.state.company,
      username: this.state.username,
      password: this.state.password,
      stuname:this.state.stuname,
      stuid:this.state.stuid,
      role:"ita",
    };

    axios.post("http://localhost:5000/ita/addita", ita).then((res) => {
      const response = res.data.result;
      console.log(response);

      if (response == "success") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "ITA added successfully",
        });
        this.handleClear()
      } else {
        //alert("Error occured !");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response,
        });
      }
    });
  };

  handleClear = (e) => {
    this.setState({
      name: "",
      designation: "",
      email: "",
      phone: "",
      company: "",
      username: "",
      password: "",
      stuname:"",
      stuid:""
    });
  };

  // StudentList(){
  //   return this.state.stuarry.map((stu) =>{
  //     return(
  //         <option value={stu._id}>{stu.name} | {stu.selectedCompany}</option>
  //     )
  //   }
  // )
  // }
  StudentList() {
    return this.state.stuarry.map((student) => {
      return (
          <option value={student._id}>{student.name}</option>
      );
    });
  }

  passwordGen = () => {
    var genpassword = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
    });
    this.setState({ ...this.state, password: genpassword });
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"> <FontAwesomeIcon
              icon={faUserPlus}
              style={{ marginRight: "10px" }}
          />New ITA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
            <div className="form-group">
              <label htmlFor="cname">Name</label>
              <input
                type="text"
                id="Name"
                className="form-control"
                placeholder="Enter name"
                value={this.state.name}
                onChange={this.handlenamechange}
                required
              ></input>
            </div>
              </Col>
              <Col>
            <div className="form-group">
              <label htmlFor="designation">Designation</label>
              <input
                type="text"
                id="designation"
                className="form-control"
                placeholder="Enter designation"
                value={this.state.designation}
                onChange={this.handledesignationchange}
                required
              ></input>
            </div>
              </Col>
            </Row>
            <Row>
              <Col>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleemailchange}
                required
              ></input>
            </div>
              </Col>
              <Col>
            <div className="form-group">
              <label htmlFor="mobile">Phone No</label>
              <br></br>
              <input
                type="number"
                maxLength="10"
                id="Phone"
                className="form-control"
                placeholder="Enter phone no."
                value={this.state.phone}
                onChange={this.handlephonechange}
              ></input>
            </div>
              </Col>
            </Row>
            <Row>
            <Col>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <br></br>
              <input
                type="text"
                id="company"
                name="company"
                className="form-control"
                placeholder="Enter company"
                value={this.state.company}
                onChange={this.handlecompanychange}
              ></input>
            </div>
            </Col>
            <Col>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Allocate Intern</Form.Label>
                  <select className="form-control" id='drop' onChange={this.handlestudentchange}>
                    {this.StudentList()}
                  </select>
                </Form.Group>
            </Col>
            </Row>
            <Row>
              <Col>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <br></br>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.handleusernamechange}
              ></input>
            </div>
              </Col>
              <Col>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <br></br>
                  <InputGroup className="mb-3">
                    <FormControl
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handlepasswordchange}
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <Button onClick={this.passwordGen} variant="outline-secondary">GEN</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Col>
            </Row>
            <Row className="text-center" style={{ margin: "5px" }}>
              <Col>
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={this.handlesubmit}
                    style={{ width: "40%" }}
                >
                  Create
                </button>
              </Col>
            </Row>
            <Row className="text-center" style={{ margin: "5px" }}>
              <Col>
                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={this.handleClear}
                    style={{ width: "40%" }}
                >
                  Clear
                </button>
              </Col>
            </Row>

          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Addita;
