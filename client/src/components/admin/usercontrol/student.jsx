import React, { Component } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {Button, Container, Row, Col, Table, FormControl} from "react-bootstrap";
import Addstudent from "./addstudent";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Tabletop from "tabletop";
import {CSVLink} from "react-csv";
import {TextField} from "@material-ui/core";


const Student = (props) => (
  <tr className="text-center">
    <td>{props.student.name}</td>
    <td>{props.student.stuno}</td>
    <td>{props.student.email}</td>
    <td>{props.student.dob}</td>
    <td>{props.student.address}</td>
    <td>{props.student.mobile}</td>
    <td>{props.student.gender}</td>
    <td>
      <Link to={"/admin/usercontrol/student/edit/" + props.student._id}>
        <Button className="btn-secondary m-1 btn-sm" style={{ width: "60px" }}>
          Edit
        </Button>
      </Link>

      <Button
        className="btn btn-danger m-1 btn-sm"
        style={{ width: "60px" }}
        onClick={() => {
          props.deletestu(props.student._id);
        }}
      >
        Delete
      </Button>
    </td>
  </tr>
);

class userStudent extends Component {
  constructor(props) {
    super(props);

    this.deleteStudent = this.deleteStudent.bind(this);
    this.deleteall = this.deleteall.bind(this);
    this.init = this.init.bind(this);
    this.state = {
      showpopup: false,
      studentlist: [],
      searchbox:'',
      datalist:[]
    };
  }

  componentDidMount() {
    document.body.style='background: #E5E7E9;'
    this.getStudentData()
  }
  getStudentData(){
    let arry=[]
    axios
        .get("http://localhost:5000/student/")
        .then((Response) => {
          this.setState({ studentlist: Response.data });
              if(Response.data.length!==0){
          Response.data.forEach((item)=>{
            const obj={
              Name:item.name,
              Stu_No:item.stuno,
              Email:item.email,
              DOB:item.dob,
              Address:item.address,
              Phone:item.mobile,
              Gender:item.gender
            }
            arry.push(obj)
          })
          this.setState({datalist:arry})
          console.log("test",this.state.datalist)
              }
        })
        .catch((error) => {
          console.log(error);
        });
  }

  deleteStudent(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //Swal.fire("Deleted!", "Student has been deleted.", "success");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Deleted!",
        });
        axios
          .delete("http://localhost:5000/student/" + id)
          .then((res) => console.log(res.data));
        this.setState({
          studentlist: this.state.studentlist.filter((i) => i._id !== id),
        });
      }
    });
  }

  studentList() {
    return this.state.studentlist.filter((val)=>{
      if(this.state.searchbox===""){
        return val
      }
      else if(val.name.toLowerCase().includes(this.state.searchbox.toLowerCase())){
        return val
      }
    }).map((currentstudent) => {
      return (
          <Student
              student={currentstudent}
              deletestu={this.deleteStudent}
              key={currentstudent._id}
          />
      );
    });
  }

  async init() {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "Import a Google Sheet",
      inputPlaceholder: "Enter the Shareble link",
    });
    if (url) {
      var n = url.startsWith("https://docs.google.com/spreadsheets/");
      console.log(n);
      if (n) {
        //Swal.fire(`Entered URL: ${url}`)s
        Swal.fire({
          title: "Are you sure?",
          text: "All the data will be imported.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Import",
        }).then((result) => {
          if (result.isConfirmed) {
            Tabletop.init({
              key: url,
              simpleSheet: false,
            }).then((data) => {
              console.log(data.Sheet1.elements);
              const studentsheet = data.Sheet1.elements;
              axios.post(
                "http://localhost:5000/student/addstudentarray",
                studentsheet
              ).then((res)=>{
                console.log(res.data);
                if(res.data.result=="success"){
              //loading msg
              let timerInterval;
              Swal.fire({
                title: "Importing....",
                html: "Importing will complete in <b></b> ms.",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  timerInterval = setInterval(() => {
                    const content = Swal.getHtmlContainer();
                    if (content) {
                      const b = content.querySelector("b");
                      if (b) {
                        b.textContent = Swal.getTimerLeft();
                      }
                    }
                  }, 100);
                  this.componentDidMount();
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log("I was closed by the timer");
                }
              });
                }
              })
              //Swal.fire("Imported!", "Your data has been imported.", "success");
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid URL",
        });
      }
    }
  }

  //Delete all data
  deleteall() {
    Swal.fire({
      title: "Are you sure?",
      text: "All data will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://localhost:5000/student/deleteall").then((res) => {
          const response = res.data;
          if (response == "success") {
            this.componentDidMount();
            Swal.fire("Deleted!", "All data has been deleted.", "success");
          } else {
            this.componentDidMount();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        });
      }
    });
  }



  render() {
    let popupclose = () => {
      this.setState({showpopup: false})
      this.componentDidMount()
    };

    return (
      <div>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h3 style={{fontFamily: 'Assistant'}}>Student</h3>
          <Container>
            <Row style={{ float: "right", marginBottom: "10px" }}>
              <Col>
                <FormControl size="sm" type="searchbox" placeholder="Search..." onChange={(e)=>{this.setState({searchbox:e.target.value})}} />
              </Col>
                <Button
                  className="btn-sm"
                  style={{ margin: "2px", width: "80px" }}
                  variant="primary"
                  onClick={() => {
                    this.setState({ showpopup: true });
                  }}
                >
                  Add
                </Button>
                <Button
                  className="btn-sm"
                  style={{ margin: "2px", width: "80px" }}
                  variant="success"
                  onClick={this.init}
                >
                  Import
                </Button>
              {/*<Button*/}
              {/*    className="btn-sm"*/}
              {/*    style={{ margin: "2px", width: "80px" }}*/}
              {/*    variant="success"*/}
              {/*    onClick={this.createPDF}*/}
              {/*>*/}
              {/*  Download*/}
              {/*</Button>*/}
              <CSVLink data={this.state.datalist} style={{ margin: "2px", width: "80px" }} className="btn btn-sm btn-info"  filename={"StudentList.csv"}>Download</CSVLink>
                <Button
                  className="btn-sm"
                  style={{ margin: "2px", width: "80px" }}
                  variant="danger"
                  onClick={this.deleteall}
                >
                  Delete all
                </Button>
            </Row>
          </Container>
          <Table id='stutable' bordered hover >
            <thead style={{backgroundColor:'white'}}>
              <tr className="text-center">
                <th>Name</th>
                <th>Stu. No</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{backgroundColor:'white'}}>{this.studentList()}</tbody>
          </Table>
        </div>
        <Addstudent show={this.state.showpopup} onHide={popupclose} backdrop="static"/>
      </div>
    );
  }
}

export default userStudent;
