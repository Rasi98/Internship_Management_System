import React, { Component } from "react";
import Navbar from "./Navbar";
import {Container, Row, Col, ListGroup, Button, Form} from "react-bootstrap";
import axios from "axios";
import AllocateCompanyModel from "./allocateCompanymodel";

const Student=(props)=>(
    <ListGroup.Item action onClick={() =>  props.setSelectedStudent(props.student)}>
        {props.student.name}
    </ListGroup.Item>
);


class allocateCompany extends Component {
    constructor(props) {
        super(props);
        this.state={
            studentList:[],
            allocatedcompany:[],
            selectedStudent: {},
            showpopup: false,
        }
    }
    setSelectedStudent = (stu) => {

        axios.get(`http://localhost:5000/companyallocate/${stu._id}`)
            .then((res)=>{
                this.setState({
                    allocatedcompany: []
                })
                res.data.forEach(a => {
                    let preAll = this.state.allocatedcompany
                    let allocated = {
                        id: a._id,
                        name: a.company.name,
                        student_id:a.student._id,
                        company_id: a.company._id,
                        status: a.status
                    }
                    preAll.push(allocated)
                    this.setState({
                        allocateCompany: preAll
                    })
                })

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
                  <Col className="mt-1 mb-1"  sm={4}>
                      <ListGroup defaultActiveKey="#link1" style={{padding:"3px",borderRadius:"10px",overflowY:"scroll",maxHeight:"400px"}}>
                          {this.studentList()}
                      </ListGroup>
                  </Col>
                  <Col className="border mt-1 mb-1" style={{borderRadius:"10px"}}  sm={8}>
                      {this.state.allocatedcompany && this.state.allocatedcompany.map((c) =>{ return(
                      <Container className="border m-2" style={{borderRadius:"10px",height:"auto"}}>
                          <Row className="m-1">
                              <Col>
                                  {c.name}-{c.company_id}--{c.student_id}
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
                          <AllocateCompanyModel data={c.student_id} show={this.state.showpopup} onHide={popupclose}/>
                      </Container>
                          )})}
                  </Col>
              </Row>
          </Container>

            </div>
      </React.Fragment>

    );
  }
}

export default allocateCompany;
