import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import {Row, Col, Button, ListGroup, Container} from "react-bootstrap";
import AdminNavbar from "./Navbar";
import {Paper} from "@material-ui/core";

export default function StudentProfile() {
  const [ students,setStudents]  =useState([]) ;


  useEffect(()=>{
    axios.get("http://localhost:5000/student/")
        .then((res)=>{
          setStudents(res.data)
          console.log(res.data)
        })
        .catch(err=>{
          console.log(err)
        })
  },[])


  return(
      <React.Fragment>
        <AdminNavbar/>
        <div className='container mt-4'>
          <h3 className='text-center m-3'>Student CVs</h3>
          <Paper elevation={3} style={{padding:'1px'}}>
            <Row className='m-2'>
              <Col className=" border mt-1 mb-1" style={{overflowY:"auto",maxHeight:"500px",borderRadius:"10px"}}  sm={4}>
                <ListGroup  style={{padding:"3px"}}>
                  {students.map((student)=>(
                      <Container id={student._id}  className="border m-1" style={{borderRadius:"5px"}}>
                        <div style={{cursor:"pointer"}} onClick={()=>{
                          console.log(student)}}>
                          <Row className="pl-2 pt-2"> <h6>{student.name}</h6></Row>
                          <Row className="pl-2 pb-2"><span style={{fontSize:"12px"}}>{student.stuno}</span></Row>
                        </div>
                      </Container>
                  ))}
                </ListGroup>
              </Col>
              <Col className=" mt-1 mb-1"   sm={8}>

              </Col>
            </Row>
          </Paper>
        </div>
      </React.Fragment>
  )
}