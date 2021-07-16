import MaterialTable from "material-table";
import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import axios from "axios";
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import {Checkbox, FormControlLabel, MenuItem, Select} from "@material-ui/core";
import Modal from 'react-modal'
import AnimeList from "./allocatecommodel";
import RefreshIcon from '@material-ui/icons/Refresh';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


export default function Editable() {
    const [ students,setStudents]  =useState([]) ;
    const [selectedStudent,setselectedStudent]=useState([]);
    const [selectedstuId,setselectedstuId]=useState('')
    const [showpopup,setshowpopup]=useState(false);
    const [filter,setfilter]=useState(false)


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
        { title: 'Company', field: 'name',filtering: false,editable:false},
        { title: 'Status', field: 'status',filtering:true,lookup:{'allocate':'Allocated','cvsent':'CV Sent','shortlisted':'Shortlisted','interviewed':'Interviewed','notselected':'Notselected','paused':'Paused','stopped':'Stopped'} ,
            render:(row)=>
               ( <Select value={row.status}>
                    <MenuItem value="allocate">Allocated</MenuItem>
                    <MenuItem value="cvsent">CV Sent</MenuItem>
                    <MenuItem value="shortlisted">Shortlisted</MenuItem>
                    <MenuItem value="interviewed">Interviewed</MenuItem>
                    <MenuItem value="notselected">Not selected</MenuItem>
                    <MenuItem value="paused">Paused</MenuItem>
                    <MenuItem value="stopped">Stopped</MenuItem>
                </Select>,statuscolor(row))
        },
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
        setselectedStudent(stu)
        setselectedstuId(stuId)
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
    function updateRow(newdata) {
        console.log(newdata.id)
        const obj={
            id:newdata.id,
            status:newdata.status
        }
        axios.post("http://localhost:5000/companyallocate/status",obj)
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    const setModalIsOpenToTrue =()=>{
        setshowpopup(true)

    }
    const setModalIsOpenToFalse =()=>{
        setshowpopup(false)
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

    const handleChange=()=> {
        setfilter(!filter)
    }
    const refresh=()=>{
        getAllocatedCompanies(selectedStudent);
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
                        title={selectedStudent.name}
                        columns={columns}
                        data={data}
                        options={{
                            filtering:filter,
                            actionsColumnIndex:-1,
                            addRowPosition:"first",
                            headerStyle:{
                                zIndex:'0'
                            }

                        }}
                        actions={[
                            {
                                icon:()=><FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filter}
                                            onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Filter"
                                />,tooltip:"Hide/Show Filter",
                                isFreeAction:true
                            },
                            {
                                icon:()=> <Button
                                    className="btn-sm"
                                    onClick={setModalIsOpenToTrue}
                                    style={{position:'relative',margin:'1px'}}
                                >
                                  <PersonAddIcon/>
                                </Button>,tooltip:"Allocate new company",
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
                            }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        updateRow(newData)
                                        setColumns([...dataUpdate]);
                                        resolve();
                                    }, 1000);
                                }),
                        }}
                    />
                </Col>
                </Row>
            </div>
        <Modal isOpen={showpopup} style={customStyles} onRequestClose={()=> setModalIsOpenToFalse()}>
            <AnimeList student={selectedStudent}/>
        </Modal>

    </React.Fragment>
    )
}
