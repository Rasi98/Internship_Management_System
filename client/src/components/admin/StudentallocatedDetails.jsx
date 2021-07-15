import MaterialTable from "material-table";
import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import axios from "axios";
import {Col, Container, ListGroup, Row} from "react-bootstrap";


export default function Editable() {
    const [ students,setStudents]  =useState([]) ;


    useEffect(()=>{
        axios.get("http://localhost:5000/student/")
            .then((res)=>{
                setStudents(res.data)
                console.log(students)
            })
            .catch(err=>{
                console.log(err)
            })
    },[])

    const [data, setColumns] = useState()
        const columns=[
        { title: 'Company', field: 'name'},
        { title: 'Status', field: 'status',lookup:{1:'Allocated',2:'CV Sent'} ,render:(row)=>statuscolor(row)},
    ];

    function statuscolor(row) {
        const state=row.status;
        if(state==="allocate")
            return <div className={row.status} style={{backgroundColor:"#A3E4D7",width:"fit-content",padding:"0 5px",borderRadius:"2px"}}><span>Allocated</span></div>
        else if(state==="cvsent")
            return <div className={row.status} style={{backgroundColor:"#FAD7A0",width:"fit-content",padding:"0 5px",borderRadius:"2px"}}><span>CV Sent</span></div>
        else if(state==="shortlisted")
            return <div className={row.status} style={{backgroundColor:"#82E0AA",width:"fit-content",padding:"0 5px",borderRadius:"2px"}}><span>Shortlisted</span></div>
        else if(state==="interviewed")
            return <div className={row.status} style={{backgroundColor:"#85C1E9",width:"fit-content",padding:"0 5px",borderRadius:"2px"}}><span>Interviewed</span></div>
        else if(state==="notselected")
            return <div className={row.status} style={{backgroundColor:"#F1948A",width:"fit-content",padding:"0 5px",borderRadius:"2px"}}><span>Notselected</span></div>
        else if(state==="paused")
            return <div className={row.status} style={{backgroundColor:"#AEB6BF",width:"fit-content",padding:"0 5px",borderRadius:"2px"}}><span>Paused</span></div>
        else if(state==="stopped")
            return <div className={row.status} style={{backgroundColor:"#D2B4DE",width:"fit-content",padding:"0 5px",borderRadius:"2px"}}><span>Stopped</span></div>
    }

    //Get allocations when click on student name
    function getAllocatedCompanies(stu){
        let arry=[];
        const stuId=stu._id;
        axios.get('http://localhost:5000/companyallocate/'+stuId)
            .then((res)=>{
                if(res.data.length===0){
                    console.log("no data")
                    let pendingarry=[];
                    setColumns(pendingarry)
                }
                else{
                    res.data.forEach((a)=>{
                        let oneallocation;
                        oneallocation = {
                            id: a._id,
                            name: a.company.name,
                            status: a.status
                        };
                        arry.push(oneallocation)
                    })
                    setColumns(arry)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    //Delete a row
    function deleteRow(id) {
        axios.delete("http://localhost:5000/companyallocate/deletecompany/"+id)
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })

    }

    return (
        <React.Fragment>
            <Navbar/>
            <div className="container mt-4">
                <h3 className="text-center m-3">Internship Allocation</h3>
                <Row className="m-2">
                <Col className=" border mt-1 mb-1" style={{overflowY:"auto",maxHeight:"500px",borderRadius:"10px"}}  sm={4}>
                    <ListGroup  style={{padding:"3px"}}>
                        {students.map((student)=>(
                            <Container id={student._id} className="border m-1" style={{borderRadius:"5px"}}>
                                <div style={{cursor:"pointer"}} onClick={()=>getAllocatedCompanies(student)}>
                                <Row className="pl-2 pt-2"> <h6>{student.name}</h6></Row>
                                <Row className="pl-2 pb-2"><span style={{fontSize:"12px"}}>{student.stuno} | {student.staffintmarks}</span></Row>
                                </div>
                            </Container>
                        ))}
                    </ListGroup>
                </Col>
                <Col className=" mt-1 mb-1"   sm={8}>
                    <MaterialTable
                        title="Allocated companies"
                        columns={columns}
                        data={data}
                        options={{
                            filtering:true,
                            doubleHorizontalScroll:true,
                            actionsColumnIndex:-1,
                            addRowPosition:"first"
                        }}
                        editable={{
                            onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
                                const updateddata=[...data,newRow]
                                setTimeout(()=>{
                                    setColumns(updateddata)
                                    resolve()
                                },2000)
                                console.log(newRow)
                            }),
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
            </div>
        </React.Fragment>
    )
}
