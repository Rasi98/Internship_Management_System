import React, { Component } from "react";
import Navbar from "./Navbar";
import {Container, Row, Col, ListGroup, Button, Form} from "react-bootstrap";
import axios from "axios";
import AllocateCompanyModel from "./allocateCompanymodel";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Student=(props)=>(
    <ListGroup.Item action onClick={() =>  props.setSelectedStudent(props.student)}>
        {props.student.name}
    </ListGroup.Item>
);


class allocateCompany extends Component {
    constructor(props) {
        super(props);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.setSelectedStudent=this.setSelectedStudent.bind(this);
        this.state={
            studentList:[],
            allocatedcompany:[],
            selectedStudent: {},
            selestudentid:"",
            showpopup: false,
            stuname:""

        }
    }
    setSelectedStudent = (stu) => {
        this.setState({selestudentid:stu._id,stuname:stu.name})
        axios.get(`http://localhost:5000/companyallocate/${stu._id}`)
            .then((res)=>{
                this.setState({
                    allocatedcompany: []
                })
                console.log(res);
                if(res.data.length===0) {
                    document.getElementById("notice").innerText = "No Placements";
                }
                else {
                    res.data.forEach(a => {
                        let preAll = this.state.allocatedcompany
                        let allocated = {
                            id: a._id,
                            name: a.company.name,
                            stuname:a.student.name,
                            student_id: a.student._id,
                            company_id: a.company._id,
                            status: a.status
                        }
                        preAll.push(allocated)
                        this.setState({
                            allocateCompany: preAll
                        })
                        document.getElementById("notice").innerText= a.student.name;

                    })
                }
            })
            .catch((error)=>{
                console.log(error);
            })


    }

 componentDidMount() {
        axios.get("http://localhost:5000/student/")
            .then((res)=>{
                this.setState({studentList:res.data})
               console.log(this.state.studentList);
            })
            .catch((err)=>{
                console.log(err);
            })

 }

    deleteCompany=(id,stuid)=> {
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
                Swal.fire("Deleted!", "Your item has been deleted.", "success");
                axios
                    .delete("http://localhost:5000/companyallocate/deletecompany/" + id)
                    .then((res) => console.log(res.data));
                // this.setState({
                //     allocatedcompany: this.state.allocatedcompany.filter((el) => el._id !== id),
                // });
                this.setSelectedStudent(stuid);
            }
        });
    }

    studentList() {
        return this.state.studentList.map((currentstudent) => {
            return (
                <Student
                    setSelectedStudent={this.setSelectedStudent}
                    student={currentstudent}
                    key={currentstudent._id}

                />
            );
        });
    }

    colorchange(state){
        if(state==="allocate")
          return "#A3E4D7"
        if(state==="cvsent")
            return "#FAD7A0"
        if(state==="shortlisted")
            return "#82E0AA"
        if(state==="interviewed")
            return "#85C1E9 "
        if(state==="notselected")
            return "#F1948A "
        if(state==="paused")
            return "#AEB6BF"
        if(state==="stopped")
            return "#D2B4DE "
    }




    render() {
        let popupclose = () => this.setState({ showpopup: false });
    return (
        <React.Fragment>
        <Navbar></Navbar>
            <div className="container mt-4">
        <h3 className="text-center m-3">Allocate company</h3>
                <Container className="border" style={{ borderRadius: "10px"}} fluid>
              <Row className="m-2">
                  <Container>
                      <Row style={{ float: "right", marginBottom: "15px" }}>
                          <Col>
                              <Button
                                  className="btn-sm"
                                  style={{ margin: "2px", width: "80px" }}
                                  variant="primary"
                                  onClick={()=>{
                                      this.setState({showpopup:true})
                                  }}
                              >
                                  Allocate
                              </Button>
                              <Button
                                  className="btn-sm"
                                  style={{ margin: "2px", width: "80px" }}
                                  variant="danger"
                              >
                                  Update
                              </Button>
                          </Col>
                      </Row>
                  </Container>
                  <Col className="mt-1 mb-1" style={{overflowY:"scroll",maxHeight:"400px"}}  sm={4}>
                      <ListGroup  style={{padding:"3px",borderRadius:"10px"}}>
                          {this.studentList()}
                      </ListGroup>
                  </Col>
                  <Col className="border mt-1 mb-1" style={{borderRadius:"10px",overflowY:"scroll",maxHeight:"400px"}}  sm={8}>
                      <h5 className="text-center" id="notice"></h5>
                      {this.state.allocatedcompany && this.state.allocatedcompany.map((c) =>{ return(
                      <Container className="border m-2" style={{borderRadius:"10px",height:"auto", backgroundColor:this.colorchange(c.status)}}>

                          <Row className="m-1">
                              <Col>
                                  <h5>{c.name}</h5>
                              </Col>
                              <Col >
                                  <Button className="btn-danger" style={{float:"right",marginTop:"3px"}} onClick={()=>this.deleteCompany(c.id,c.student_id)}>
                                  <FontAwesomeIcon
                                      icon={faTrash}
                                  />
                                  </Button>
                              </Col>
                          </Row>
                          <Row className="m-1">
                              <Form>
                                  <div id="radiogroup">
                                      <Form.Check inline checked={"allocate"===c.status} label="Allocate" type="radio"   name="allocate" />
                                      <Form.Check inline checked={"cvsent"===c.status} label="CV sent" type="radio"   name="allocate" />
                                      <Form.Check inline checked={"shortlisted"===c.status} label="Shortlisted" type="radio"   name="allocate" />
                                      <Form.Check inline checked={"interviewed"===c.status} label="Interviewed" type="radio"   name="allocate" />
                                      <Form.Check inline checked={"notselected"===c.status} label="Not selected" type="radio"   name="allocate" />
                                      <Form.Check inline checked={"paused"===c.status} label="Process Paused" type="radio"   name="allocate" />
                                      <Form.Check inline checked={"stopped"===c.status} label="Process Stoped" type="radio"   name="allocate" />
                                  </div>
                              </Form>
                          </Row>
                      </Container>
                          )})}
                  </Col>
              </Row>
          </Container>
                <AllocateCompanyModel data={this.state.selestudentid} stuname={this.state.stuname}  show={this.state.showpopup} onHide={popupclose}/>
            </div>
      </React.Fragment>

    );
  }
}

export default allocateCompany;
