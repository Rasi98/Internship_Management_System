import React, {Component, useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Paper} from "@material-ui/core";
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import axios from "axios";
import MaterialTable from "material-table";
import Allocateitaamodel  from "./allocateItaaModel.jsx";
import Modal from "react-modal";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RefreshIcon from "@material-ui/icons/Refresh";

export default function AllocateITAA(){
    const [data, setColumns] = useState()
    const [itaa,setitaa]=useState([])
    const [selecteditaa,setselecteditaa]=useState([])
    const [showpopup,setshowpopup]=useState(false);


    const columns=[
        { title: 'Name', field: 'name'},
        { title: 'Stu.No', field: 'stuno'},
        { title: 'Selected Company', field: 'selectedCompany'},
    ]

    useEffect(()=>{
        document.body.style='background: #E5E7E9;'
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
    function deleteRow(id) {
        console.log(id)
        axios.delete("http://localhost:5000/itaaallocate/delete/"+id)
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const setModalIsOpenToTrue =()=>{
        setshowpopup(true)

    }
    const setModalIsOpenToFalse =()=>{
        setshowpopup(false)
    }

    const refresh=()=>{
        getAllocatedStudents(selecteditaa);
    }

    const customStyles = {
        zIndex:'1000',
        fontcolor : 'black',
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            transform             : 'translate(-50%, -50%)',
            marginRight           : '-50%',
            backgroundColor       : '#E5E7E9',
        }
    };


    return(
        <React.Fragment>
            <Navbar/>
            <div className='container mt-4'>
                <h3 className="text-center my-3 mb-3" style={{fontFamily: 'Assistant'}}>ITAA Allocation</h3>
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
                                data={data}
                                options={{
                                    actionsColumnIndex:-1,
                                    headerStyle: {
                                        zIndex: '0'
                                    }
                                }}
                                actions={[
                                    {
                                        icon:()=><Button
                                            className="btn-sm"
                                            onClick={setModalIsOpenToTrue}
                                            style={{position:'relative',margin:'1px'}}
                                        >
                                            <PersonAddIcon/>
                                        </Button>,tooltip:"Allocate new student",
                                        isFreeAction:true
                                    },
                                    {
                                        icon:()=><Button
                                            style={{position:'absolute',margin:'1px'}}
                                            className="btn-sm btn-success"
                                            onClick={refresh}
                                        ><RefreshIcon/></Button>,tooltip:'Refresh',
                                        isFreeAction:true
                                    }
                                ]}
                                editable={{
                                    onRowDelete:selectedRow=>new Promise((resolve, reject)=>{
                                        const index=selectedRow.tableData.id
                                        const updatedRow=[...data]
                                        updatedRow.splice(index,1)
                                        setTimeout(()=>{
                                            deleteRow(selectedRow.id)
                                            setColumns(updatedRow)
                                            resolve()
                                        },1000)
                                    })
                                }}
                            />

                        </Col>

                    </Row>
                </Paper>
            </div>
            <Modal isOpen={showpopup} style={customStyles} onRequestClose={()=> setModalIsOpenToFalse()}>
                <Allocateitaamodel itaa={selecteditaa}/>
            </Modal>
        </React.Fragment>
    )
}
