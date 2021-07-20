import React, {useEffect, useState} from 'react'
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function Allocatecommodel (props) {

    const [companylist, setcompanylist] = useState([])
    const [comId,setcomId]=useState('')
    const [comname,setcomname]=useState('')
    const history = useHistory();


    useEffect((props) => {
        axios.get("http://localhost:5000/company/")
            .then((res) => {
                setcompanylist(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const companynameList = companylist.map((currentcompany) =>
        <option value={currentcompany._id}>{currentcompany.name}</option>
    );

    const handlechange=(e)=>{
        setcomId(e.target.value)
        const com = document.getElementById("drop");
        const strUser = com.options[com.selectedIndex].text;
        setcomname(strUser);
    }
   const onAllocate=(e)=> {
       const allocateobj={
           studentid:props.student._id,
           companyid:comId,
           companyname:comname,
           stuemail:props.student.email
       }
       console.log(allocateobj)
       axios.post("http://localhost:5000/companyallocate/add",allocateobj)
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
                <h4>Allocate a new company</h4>
                <h6>{props.student.name} => {comname}</h6>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Select a company</Form.Label>
                        <select className="form-control" id="drop" value={comId} onChange={handlechange}>
                            {companynameList}
                        </select>
                    </Form.Group>
                    <Button onClick={onAllocate}>Allocate</Button>
                </Form>
            </div>
        </React.Fragment>
    )
}


