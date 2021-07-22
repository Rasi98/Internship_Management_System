import React, { Component } from "react";
import Navbarstd from "../student/Navbar";
import {Container, Row,Col} from "react-bootstrap";
import {Divider, ListItem, ListItemIcon, ListItemText, Paper} from "@material-ui/core";
import axios from "axios";
import jwtDecode from "jwt-decode";
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import HomeIcon from '@material-ui/icons/Home';
import CakeIcon from '@material-ui/icons/Cake';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SchoolIcon from '@material-ui/icons/School';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PersonIcon from '@material-ui/icons/Person';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import HowToRegIcon from '@material-ui/icons/HowToReg';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            phone:'',
            address:'',
            dob:'',
            stuno:'',
            spepath:'',
            finalcom:'',
            intcount:'',
            gpa:'',
            itaa:'',
            comlist:[],
            totalallo:'',
            company:'',
            staffint:'',
            italist:[],
            interest:[]
        };
    }
    componentDidMount() {
        this.getstudentdata()
        this.getallocationdata()
        this.getITAData()
    }
    getITAData(){
        const jwt=localStorage.getItem("token")
        const stuId=jwtDecode(jwt)._id
        const obj={
            stuid:stuId
        }
        axios.post("http://localhost:5000/ita/getita",obj)
            .then((res)=>{
                console.log(res.data.result)
                if(res.data.result==="false"){
                    this.setState({italist:[]})
                }
                else{
                    this.setState({italist:res.data.result})
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    getallocationdata(){
        let arry=[]
        const jwt=localStorage.getItem("token")
        const stuId=jwtDecode(jwt)._id
        axios.get("http://localhost:5000/companyallocate/"+stuId)
            .then((res)=>{
                console.log(res.data)
                this.setState({totalallo:res.data.length})
                res.data.forEach((com)=>{
                    let obj={
                        id:com._id,
                        name:com.company.name,
                        status:com.status
                    }
                    arry.push(obj)
                })
                this.setState({comlist:arry})
                console.log("arry",this.state.comlist)
            })
    }

    getstudentdata(){
        const jwt = localStorage.getItem("token")
        const stuId = jwtDecode(jwt)._id
        axios.get("http://localhost:5000/student/"+stuId)
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    name:res.data.name,
                    email:res.data.email,
                    phone:res.data.mobile,
                    address:res.data.address,
                    dob:res.data.dob,
                    stuno:res.data.stuno,
                    spepath:res.data.specialization,
                    finalcom:res.data.selectedCompany,
                    intcount:res.data.interviewCount,
                    gpa:res.data.gpa,
                    itaa:res.data.allocatedITAA,
                    company:res.data.selectedCompany,
                    staffint:res.data.staffInterview,
                    interest:res.data.interest
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    }


    colorchange(status){
        const state=status;
        if(state==="allocate")
            return  "#A3E4D7"
        else if(state==="cvsent")
            return "#FAD7A0"
        else if(state==="shortlisted")
            return "#27AE60"
        else if(state==="interviewed")
            return"#85C1E9"
        else if(state==="notselected")
            return "#F1948A"
        else if(state==="testfaced")
            return"#FF00FF"
        else if(state==="selected")
            return "#82E0AA"
    }

    ITAList=()=>{
        if(this.state.italist.length!==0){
            return this.state.italist.map((ita) => {
                return (
                    <Container id={ita._id}  className="border mb-2" style={{borderRadius:"5px"}}>
                        <div>
                            <Row className="pl-2 pt-2">
                                <ListItem>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={ita.name} secondary={
                                        <div>
                                            <div>{ita.designation}</div>
                                            <div>{ita.company}</div>
                                            <div>{ita.email}</div>
                                            <div>{ita.phone}</div>
                                        </div>
                                    } />
                                </ListItem>
                            </Row>
                        </div>
                    </Container>
                );
            });
        }
    }

    render() {
        return (
            <div>
                <Navbarstd />
                <div className='container mt-4' style={{width:'80%'}}>
                    <Row>
                        <Col>
                            <Paper elevation={3}  style={{padding:'2%'}}>
                                <Container >
                                    <h5 className='text-center'>{this.state.name}</h5>
                                    <Divider style={{margin:'3%'}}/>
                                    <Row>
                                        <Col>
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
                                            <HomeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Address" secondary={this.state.address} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CakeIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary='DOB' secondary={this.state.dob} />
                                    </ListItem>
                                        </Col>
                                        <Col>
                                    <ListItem>
                                        <ListItemIcon>
                                            <AssignmentIndIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Student No.' secondary={this.state.stuno} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <SchoolIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Path" secondary={this.state.spepath} />
                                    </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <ImportContactsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="GPA" secondary={this.state.gpa} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <PeopleAltIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="#Interviews" secondary={this.state.intcount} />
                                            </ListItem>
                                        </Col>
                                    </Row>
                                </Container>
                            </Paper>
                        </Col>
                        <Col>
                            <Paper elevation={3} style={{padding:'10px'}}>
                                <h5 className='text-center'>Company</h5>
                                <Divider style={{margin:'3%'}}/>
                                <Row>
                                    <Container>{this.state.comlist.map((com)=>(
                                        <Container id={com._id}  className="border mb-2" style={{borderRadius:"5px",backgroundColor:this.colorchange(com.status)}}>
                                            <div>
                                                <Row className="pl-2 pt-2"> <h6>{com.name}</h6></Row>
                                                <Row className="pl-2 pb-2"><span style={{fontSize:"12px"}}>{com.status}</span></Row>
                                            </div>
                                        </Container>
                                    ))}
                                    </Container>
                                </Row>
                                <Divider style={{margin:'3%'}}/>
                                <span className='ml-2'>Total allocations : {this.state.totalallo}</span>
                            </Paper>
                        </Col>
                    </Row>
                    <Row className='mt-2 mb-2'>
                        <Col>
                            <Paper elevation={3}  style={{padding:'2%'}}>
                                <h5 className='text-center'>Internship</h5>
                                <Divider style={{margin:'3%'}}/>
                                <Row>
                                <Col>
                                <ListItem>
                                    <ListItemIcon>
                                        <HomeWorkIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Selected Company" secondary={this.state.company} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Academic advisor" secondary={this.state.itaa} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <SupervisedUserCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Staff Interview" secondary={this.state.staffint} />
                                </ListItem>
                                </Col>
                                <Col>
                                    <ListItem>
                                        <ListItemIcon>
                                            <HowToRegIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Interest Areas" secondary={
                                            this.state.interest.map((item)=>{
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
                        <Col>
                            <Paper elevation={3}  style={{padding:'2%'}}>
                                <h5 className='text-center'>Training Advisor</h5>
                                <Divider style={{margin:'3%'}}/>
                                <Row>
                                    <Container>
                                        {/*{this.ITAList()}*/}
                                    </Container>
                                </Row>
                            </Paper>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Home;
