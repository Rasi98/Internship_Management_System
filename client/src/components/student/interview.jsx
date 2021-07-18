import React, { Component } from "react";
import Navbarstd from "../student/Navbar";
import {Divider, Paper} from "@material-ui/core";
import {Row, Col, Form, Button, Container} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";

class Interview extends Component {
  constructor(props) {
    super(props);
    this.state = {
        thirdyearexit:'',
        specializearea:'',
        interest:[]
    };
  }

  onsubmit(){
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to change these once you submit.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, submit it!'
      }).then((result) => {
          if (result.isConfirmed) {
              const jwt=localStorage.getItem("token")
              const stuId=jwtDecode(jwt)._id
              const obj={
                  thirdyearexit:this.state.thirdyearexit,
                  specializearea:this.state.specializearea,
                  interest:this.state.interest,
                  stuid:stuId
              }
              axios.post("",obj)
                  .then((res)=>{
                      console.log(res)
                  })
                  .catch((err)=>{
                      console.log(err)
                  })
              Swal.fire(
                  'Submitted!',
                  'Your details has been submitted.',
                  'success'
              )
          }
      })
  }

  render() {
    return (
      <React.Fragment>
          <Navbarstd />
        <h1 className='text-center'>Interview</h1>
          <div className='container' style={{width:'50%'}}>
          <Paper elevation={3} style={{padding:'2%'}}>
              <Container>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <h6>Are you taking the Third year exit?</h6>
                        <select className="form-control" onChange={(e)=>{
                            const selected=e.target.value
                            this.setState({thirdyearexit:selected})
                        }}>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </Form.Group>
                    <Divider style={{margin:'1%'}}/>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <h6>Area of Specialization</h6>
                        <select className="form-control" onChange={(e)=>{
                            const selected=e.target.value
                            this.setState({specializearea:selected})
                        }}>
                            <option value="BSE">BSE</option>
                            <option value="IT">IT</option>
                            <option value="OSCM">OSCM</option>
                            <option value="IS">IS</option>
                        </select>
                    </Form.Group>
                    <Divider style={{margin:'1%'}}/>
                    <h6>Interest Area/s</h6>
                    <Form.Group>
                    <Form.Check
                        inline
                        label="SE"
                        name="group1"
                        type="checkbox"
                        id="inline-checkbox-1"
                    />
                    <Form.Check
                        inline
                        label="HRM"
                        name="group1"
                        type="checkbox"
                        id="inline-checkbox-2"
                    />
                        <Form.Check
                            inline
                            label="OSCM"
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-3"
                        />
                        <Form.Check
                            inline
                            label="BA"
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-4"
                        />
                        <Form.Check
                            inline
                            label="QA"
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-5"
                        />
                    </Form.Group>
                    <Divider style={{margin:'1%'}}/>
                    <p>I hereby certify that "I have read and understood the Industrial Handbook and ready to accept any internship oppertunity allocated by the department".</p>
                </Form>
                  <div className='text-center'>
                      <Button onClick={this.onsubmit}>Submit</Button>
                  </div>
              </Container>
          </Paper>
          </div>
      </React.Fragment>
    );
  }
}

export default Interview;
