import React, { Component } from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Options=(props)=>(
        <option>{props.company.name}</option>
)

class AllocateCompanyModel extends Component{
    constructor(props) {
        super(props);
        this.state={
            comapnyList:[],
            studentID:this.props.data,
            companyID:""
        }
    }

    Allocate(){
        const allocateobj={
            studentid:this.state.studentID,
            companyid:this.state.companyID,
        }

        axios.post("http://localhost:5000/companyallocate/add",allocateobj)
            .then((res)=>{
                console.log(res);
            })
    }

    componentDidMount() {
        axios.get("http://localhost:5000/company/")
            .then((res)=>{
                this.setState({comapnyList:res.data})
                console.log(this.state.comapnyList);
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

    handlechange=(e)=>{
        this.setState({companyID:e.target.value})
        console.log("comID"+this.state.companyID);
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
                        icon={faUserPlus}
                        style={{ marginRight: "10px" }}
                    />Allocate a company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>{this.props.data}</h1>
                    <h1>{this.state.companyID}</h1>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Custom select</Form.Label>

                                <select value={this.state.companyID} onChange={this.handlechange}>
                                    {this.state.comapnyList.map((option)=>(
                                        <option value={option._id}>{option.name}</option>
                                        )
                                    )
                                    }
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