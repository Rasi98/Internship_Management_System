import React, { Component } from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

const Options=(props)=>(
        <option>{props.company.name}</option>
)

class AllocateCompanyModel extends Component{
    constructor(props) {
        super(props);
        this.Allocate=this.Allocate.bind(this);
        this.handlechange=this.handlechange.bind(this);
        this.state={
            comapnyList:[],
            stuname:"",
            comname:"",
            studentID:"",
            companyID:""
        }
    }

    componentWillReceiveProps() {
        this.setState({studentID:this.props.data})
        this.setState({stuname:this.props.stuname})
    }

    componentDidMount() {
        axios.get("http://localhost:5000/company/")
            .then((res)=>{
                this.setState({comapnyList:res.data})
                console.log(this.state.comapnyList);
                this.setState({companyID:this.state.comapnyList[0]._id})
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    companynameList() {
        return this.state.comapnyList.map((currentcompany) => {
            return (
                <Options
                    company={currentcompany}
                    key={currentcompany._id}
                />
            );
        });
    }

    Dropdownlist(){
        return this.state.comapnyList.map((com)=>{
            return(
                <option value={com._id}>{com.name}</option>

            )
        })
    }
    Allocate=(e)=>{
        const allocateobj={
            studentid:this.state.studentID,
            companyid:this.state.companyID,
        }

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


    handlechange=(e)=>{
        this.setState({companyID:e.target.value})
        console.log("comID"+this.state.companyID);
        const com = document.getElementById("drop");
        const strUser = com.options[com.selectedIndex].text;
        this.setState({comname:strUser})
        console.log(this.state.comname)
    }



    render() {
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"><FontAwesomeIcon
                        icon={faBuilding}
                        style={{ marginRight: "10px" }}
                    />Allocate a company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{this.state.stuname}=>{this.state.comname}</h5>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Select company</Form.Label>
                                <select  className="form-control" id="drop" value={this.state.companyID} onChange={this.handlechange}>
                                    {this.Dropdownlist()}
                                </select>

                        </Form.Group>
                        <Button onClick={this.Allocate}>Allocate</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default AllocateCompanyModel;