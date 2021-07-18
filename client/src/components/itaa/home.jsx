import React, { Component } from "react";
import Navbaritaa from "./Navbar";
import {Col, Container, Row, Table} from "react-bootstrap";
import jwtDecode from "jwt-decode";
import axios from "axios";
import {Divider, ListItem, ListItemIcon, ListItemText, Paper} from "@material-ui/core";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

const Student = (props) => (
    <tr className="text-center">
        <td>{props.student.student.name}</td>
        <td>{props.student.student.stuno}</td>
        <td>{props.student.student.specialization}</td>
        <td>{props.student.student.email}</td>
        <td>{props.student.student.mobile}</td>
        <td>{props.student.student.selectedCompany}</td>
    </tr>)

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            phone:"",
            student:[]
        };
    }

    componentDidMount() {
        this.getITAAData()
        this.getAllocateData()
    }
    getITAAData(){
        const jwt=localStorage.getItem("token")
        const id=jwtDecode(jwt)._id;
        axios.get("http://localhost:5000/itaa/"+id)
            .then((res)=>{
                console.log(res)
                this.setState({
                    name:res.data.name,
                    email:res.data.email,
                    phone:res.data.phone
                })

            })
            .catch((err)=>{
                console.log(err)
            })
    }
    getAllocateData(){
        const arry=[]
        const jwt=localStorage.getItem("token")
        const id=jwtDecode(jwt)._id;
        axios.get("http://localhost:5000/itaaallocate/"+id)
            .then((res)=>{
                console.log("all",res.data)
                if(res.data.length===0){
                    let emptyarry=[]
                    this.setState({student:emptyarry})
                }
                else{
                    this.setState({student:res.data})
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    studentList() {
        return this.state.student.map((currentstudent) => {
            return (
                <Student
                    student={currentstudent}
                    key={currentstudent._id}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <Navbaritaa/>
                <h1 className="text-center">ITAA Home</h1>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <Paper elevation={3}  style={{padding:'2%'}}>
                                <h5 className='text-center'>Allocated Students</h5>
                                <Divider style={{margin:'3%'}}/>
                                <Table bordered hover>
                                    <thead>
                                    <tr className="text-center">
                                        <th>Name</th>
                                        <th>Stu. No</th>
                                        <th>Path</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Company</th>
                                    </tr>
                                    </thead>
                                    <tbody>{this.studentList()}</tbody>
                                </Table>
                            </Paper>
                        </Col>
                        <Col sm={4}>
                            <Paper elevation={3}  style={{padding:'2%'}}>
                                <h5 className='text-center'>Profile</h5>
                                <Divider style={{margin:'3%'}}/>
                                <ListItem>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Name" secondary={this.state.name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <EmailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Email" secondary={this.state.email} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <PhoneIphoneIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Phone" secondary={this.state.phone} />
                                </ListItem>
                            </Paper>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;
