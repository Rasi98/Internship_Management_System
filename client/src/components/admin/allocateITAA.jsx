import React, {Component, useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Paper} from "@material-ui/core";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import axios from "axios";
import MaterialTable from "material-table";

export default function AllocateITAA(){
    const [data, setColumns] = useState()
    const [itaa,setitaa]=useState([])
    const [selecteditaa,setselecteditaa]=useState([])

    const columns=[
        { title: 'Name', field: 'name'},
        { title: 'Stu.No', field: 'stuno'},
        { title: 'Company', field: 'selectedCompany'},
    ]

    useEffect(()=>{
        axios.get("http://localhost:5000/itaa/")
            .then((res)=>{
                setitaa(res.data)
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },[])

    function getAllocatedStudents(itaa) {

        let arry=[]
        const itaaId=itaa._id
        setselecteditaa(itaa)
        axios.get("http://localhost:5000/itaaallocate/"+itaaId)
            .then((res)=>{
                console.log(res)
                if(res.data.length===0){
                    let pendingarry=[]
                    setColumns(pendingarry)
                }
                else{
                    res.data.forEach((a)=>{
                        let oneallocation;
                        oneallocation={
                            id:a._id,
                            name:a.student.name,
                            stuno:a.student.stuno,
                            selectedCompany:a.student.selectedCompany
                        }
                        arry.push(oneallocation)
                    })
                    setColumns(arry)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
      
    }

    return(
        <React.Fragment>
            <Navbar/>
            <div className='container mt-4'>
                <h3 className="text-center m-3">ITAA Allocation</h3>
                <Paper elevation={3} style={{padding:'1px'}}>
                    <Row className='m-2'>
                        <Col className=" border mt-1 mb-1" style={{overflowY:"auto",maxHeight:"500px",borderRadius:"10px"}}  sm={4}>
                            <ListGroup  style={{padding:"3px"}}>
                                {itaa.map((itaa)=>(
                                    <Container id={itaa._id}  className="border m-1" style={{borderRadius:"5px"}}>
                                        <div style={{cursor:"pointer"}} onClick={()=>getAllocatedStudents(itaa)}>
                                            <Row className="pl-2 pt-2"> <h6>{itaa.name}</h6></Row>
                                            <Row className="pl-2 pb-2"><span style={{fontSize:"12px"}}>{itaa.email}</span></Row>
                                        </div>
                                    </Container>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col className=" mt-1 mb-1"   sm={8}>
                            <MaterialTable
                                title={selecteditaa.name}
                                columns={columns}
                                data={data}/>
                        </Col>

                    </Row>
                </Paper>
            </div>

        </React.Fragment>
    )
}
