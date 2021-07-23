import React, {useEffect, useState} from 'react'
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function Allocateitaamodel (props) {

    const [studentList, setstudentList] = useState([])
    const [stuId,setstuId]=useState('')
    const [studentname,setstudentname]=useState('')


    useEffect((props) => {
        axios.get("http://localhost:5000/student/")
            .then((res) => {
                console.log(res)
                let arry=[]
                res.data.forEach((a)=>{
                    if(a.selectedCompany!=="" && a.allocatedITAA===""){
                        arry.push(a)
                    }
                })
                setstudentList(arry)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const StudentList = studentList.map((stu,index) =>
        <option value={stu._id}>{stu.name} | {stu.selectedCompany}</option>
    );

    const handlechange=(e)=>{
        setstuId(e.target.value)
        const com = document.getElementById("drop");
        const strUser = com.options[com.selectedIndex].text;
        setstudentname(strUser);
    }
    const onAllocate=(e)=> {
        const allocateobj={
            studentid:stuId,
            itaaid:props.itaa._id,
        }
        console.log(allocateobj)
        axios.post("http://localhost:5000/itaaallocate/add",allocateobj)
            .then((res)=>{
                console.log(res.data);
                if(res.data.result==="allocated"){
                    //move back to list
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Allocated successfully'
                    })
                }
                if(res.data.result==="Already allocated!") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Already allocated!',
                    })
                }
            })
    }


    return (
        <React.Fragment>
            <div style={{width: '600px'}}>
                <h4>Allocate a ITAA</h4>
                <h6>{props.itaa.name} => {studentname}</h6>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Select a student</Form.Label>
                        <select className="form-control" defaultValue={stuId} id="drop" onChange={handlechange}>
                            {StudentList}
                        </select>
                    </Form.Group>
                    <Button onClick={onAllocate} >Allocate</Button>
                </Form>

            </div>
        </React.Fragment>
    )
}


