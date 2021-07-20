import React, { Component } from "react";
import Navbarita from "./Navbar";
import {Col, Container, Row, Table} from "react-bootstrap";
import {Divider, ListItem, ListItemIcon, ListItemText, Paper} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import axios from "axios";
import jwtDecode from "jwt-decode";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import CakeIcon from "@material-ui/icons/Cake";
import WcIcon from '@material-ui/icons/Wc';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            phone:"",
            company:"",
            position:"",
            stuname:"",
            stuid:"",
            stuemail:"",
            stuaddress:"",
            stupath:"",
            studob:"",
            stuphone:"",
            stugender:"",
            stuinterest:[]
        };
    }

    componentDidMount(){
        this.getITAData()
        //this.getStudentData()
    }

    getITAData(){
        const jwt=localStorage.getItem("token")
        const id=jwtDecode(jwt)._id;
        axios.get("http://localhost:5000/ita/"+id)
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    name:res.data.name,
                    email:res.data.email,
                    phone:res.data.phone,
                    company:res.data.company,
                    position:res.data.designation,
                    stuid:res.data.stuid,
                    stuname:res.data.stuname,
                })
            })
            .then(()=>{
                console.log(this.state.stuid)
                axios.get("http://localhost:5000/student/"+this.state.stuid)
                    .then((res)=>{
                        console.log(res.data)
                        this.setState({
                            stuemail:res.data.email,
                            stuaddress:res.data.address,
                            stupath:res.data.specialization,
                            studob:res.data.dob,
                            stuphone:res.data.mobile,
                            stugender:res.data.gender,
                            stuinterest:res.data.interest
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    // getStudentData(){
    //     console.log(this.state.stuid)
    //     axios.get("http://localhost:5000/student/"+this.state.stuid)
    //         .then((res)=>{
    //             console.log(res.data)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    // }
    render() {
        return (
            <React.Fragment>
                <Navbarita/>
                <h1 className="text-center">Training Advisor</h1>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <Paper elevation={3}  style={{padding:'2%'}}>
                                <h5 className='text-center'>Allocated Intern</h5>
                                <Divider style={{margin:'3%'}}/>
                                <Row>
                                    <Col>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PersonIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Name" secondary={this.state.stuname} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <EmailIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Email" secondary={this.state.stuemail} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <HomeIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Address" secondary={this.state.stuaddress} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <SchoolIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Specializing" secondary={this.state.stupath} />
                                        </ListItem>

                                    </Col>
                                    <Col>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CakeIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="DOB" secondary={this.state.studob} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PhoneIphoneIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Phone" secondary={this.state.stuphone} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <WcIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Gender" secondary={this.state.stugender} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <HowToRegIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Interests" secondary={
                                                this.state.stuinterest.map((item)=>{
                                                    return(
                                                        <div>{item}</div>
                                                    )
                                                })
                                            } />
                                        </ListItem>

                                    </Col>
                                </Row>
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
                                <ListItem>
                                    <ListItemIcon>
                                        <LocationCityIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Company" secondary={this.state.company} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <AccountBoxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Position" secondary={this.state.position} />
                                </ListItem>
                            </Paper>
                        </Col>
                    </Row>
                </Container>

            </React.Fragment>
        );
    }
}

export default Home;
