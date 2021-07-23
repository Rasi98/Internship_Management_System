import React, {Component, useEffect, useState} from "react";
import Navbarstd from "../student/Navbar";
import {Checkbox, Divider, Paper, TextField} from "@material-ui/core";
import {Row, Col, Form, Button, Container} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import {Alert} from "@material-ui/lab";

export default function Interview(){

    const [thirdyearexit,setthirdyearexit]=useState('');
    const [specializearea,setspecializearea]=useState('');
    const [interest,setinterest]=useState([]);
    const [disable,setdisable]=useState(false);
    const [alert,setalert]=useState("none");
    const [gpa,setgpa]=useState('')

    useEffect(()=>{
        document.body.style='background: #E5E7E9;'
        getdata()
    })
    function getdata()
    {
        const jwt = localStorage.getItem("token")
        const stuId = jwtDecode(jwt)._id
        axios.get("http://localhost:5000/student/" + stuId)
            .then((res) => {
                console.log(res.data)
                if (res.data.interview === "submit") {
                    setalert("flex")
                    setdisable(true)
                } else {
                    document.getElementById("alert").style.display = "none";
                    setdisable(false)
                }
            })
    }


    function onsubmit(){
      Swal.fire({
          title: 'Are you sure?',
          text: "This is a onetime submission.You won't be able to change this once you submit.",
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
                  thirdyearexit:thirdyearexit,
                  specializearea:specializearea,
                  interest:interest,
                  gpa:gpa,
                  stuid:stuId
              }
              console.log(obj)
              axios.post("http://localhost:5000/student/interview",obj)
                  .then((res)=>{
                      console.log(res)
                      getdata()
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

    const handleChange=(event)=>{
        let newArray = [...interest, event.target.id];
        if (interest.includes(event.target.id)) {
            newArray = newArray.filter(item => item !== event.target.id);
        }
        setinterest(newArray)
    }

    return (
      <React.Fragment>
          <Navbarstd />
          <h3 className="text-center my-3 mb-3" style={{fontFamily: 'Assistant'}}>Interview</h3>
          <div className='container' style={{width:'50%'}}>
          <Paper elevation={3} style={{padding:'2%'}}>
              <Alert id='alert' variant="filled" severity="error" style={{display:alert}}>
                  Can't change this.You have already submitted !
              </Alert>
              <Container className='mt-4'>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <h6>Are you taking the Third year exit?</h6>
                        <select name='drop' disabled={disable} className="form-control" onChange={(e)=>{
                            const selected=e.target.value
                            setthirdyearexit(selected)
                        }}>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </Form.Group>
                    <Divider style={{margin:'1%'}}/>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <h6>Area of Specialization?</h6>
                        <select name='drop' disabled={disable} className="form-control" onChange={(e)=>{
                            const selected=e.target.value
                            setspecializearea(selected)
                        }}>
                            <option value="BSE">BSE</option>
                            <option value="IT">IT</option>
                            <option value="OSCM">OSCM</option>
                            <option value="IS">IS</option>
                        </select>
                    </Form.Group>
                    <Divider style={{margin:'1%'}}/>
                    <Form>
                        <h6>Current GPA?</h6>
                        <Form.Control  disabled={disable} type="number" placeholder="GPA" value={gpa} onChange={(e)=>{
                            const value=e.target.value
                            setgpa(value)
                        }} />
                    </Form>
                    <Divider style={{margin:'1%'}}/>
                    <h6>Interest Area/s</h6>
                    <label style={{margin:'3%'}}>
                        <input
                            disabled={disable}
                            id='SE'
                            type="checkbox"
                            onChange={handleChange}
                            value='SE'
                        />
                        SE
                    </label>
                    <label  style={{margin:'3%'}}>
                        <input
                            disabled={disable}
                            id='QA'
                            type="checkbox"
                            onChange={handleChange}
                            value='QA'
                        />
                        QA
                    </label>
                    <label  style={{margin:'3%'}}>
                        <input
                            disabled={disable}
                            id='HRM'
                            type="checkbox"
                            onChange={handleChange}
                            value='HRM'
                        />
                        HRM
                    </label>
                    <label  style={{margin:'3%'}}>
                        <input
                            disabled={disable}
                            id='OSCM'
                            type="checkbox"
                            onChange={handleChange}
                            value='OSCM'
                        />
                        OSCM
                    </label>
                    <label  style={{margin:'3%'}}>
                        <input
                            disabled={disable}
                            id='BA'
                            type="checkbox"
                            onChange={handleChange}
                            value='BA'
                        />
                        BA
                    </label>
                    <Divider style={{margin:'1%'}}/>
                    <p>I hereby certify that "I have read and understood the Industrial Handbook and ready to accept any internship oppertunity allocated by the department".</p>
                </Form>
                  <div className='text-center'>
                      <Button disabled={disable} onClick={onsubmit}>Submit</Button>
                  </div>
              </Container>
          </Paper>
          </div>
      </React.Fragment>
    );
  }


