import React, {Component} from 'react'
import Navbar from '../Navbar.jsx'
import {Button, Col, Container, Row} from "react-bootstrap";
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import SchoolIcon from '@material-ui/icons/School';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {ListItem, ListItemText, Paper} from "@material-ui/core";
import jwtDecode from "jwt-decode";
import axios from "axios";


class Profileview extends Component{
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            address: "",
            github: "",
            linkedin: "",
            career: "",
            college: "",
            fromyear1: "",
            toyear1: "",
            qualification1: "",
            description1: "",
            school: "",
            fromyear2: "",
            toyear2: "",
            qualification2: "",
            description2: "",
            title1: "",
            link1: "",
            projectDescription1: "",
            title2: "",
            link2: "",
            projectDescription2: "",
            title3: "",
            link3: "",
            projectDescription3: "",
            institute1: "",
            position1: "",
            duration1: "",
            experienceDescription1: "",
            institute2: "",
            position2: "",
            duration2: "",
            experienceDescription2: "",
            skill1: "",
            skill2: "",
            skill3: "",
            skill4: "",
            skill5: "",
            skill6: "",
            interest1: "",
            interest2: "",
            interest3: "",
            interest4: "",
            interest5: "",
            interest6: "",
            refname1:"",
            refpos1:"",
            refemail1:"",
            refphone1:"",
            refname2:"",
            refpos2:"",
            refemail2:"",
            refphone2:"",
        };
    }
    componentDidMount() {
        const jwt=localStorage.getItem("token")
        const stuId={
            id:jwtDecode(jwt)._id
        }
        console.log(stuId)
        axios.post("http://localhost:5000/studentprofile/get",stuId)
            .then((res)=>{
                console.log(res)
                if(res.status===200){
                    this.setState({
                        exist:true,
                        firstname: res.data[0].firstname,
                        lastname: res.data[0].lastname,
                        email: res.data[0].email,
                        phone: res.data[0].phone,
                        address: res.data[0].address,
                        github: res.data[0].github,
                        linkedin: res.data[0].linkedin,
                        career: res.data[0].career,
                        college: res.data[0].college,
                        fromyear1: res.data[0].fromyear1,
                        toyear1: res.data[0].toyear1,
                        qualification1: res.data[0].qualification1,
                        description1: res.data[0].description1,
                        school: res.data[0].school,
                        fromyear2: res.data[0].fromyear2,
                        toyear2: res.data[0].toyear2,
                        qualification2: res.data[0].qualification2,
                        description2: res.data[0].description2,
                        title1: res.data[0].title1,
                        link1: res.data[0].link1,
                        projectDescription1: res.data[0].projectDescription1,
                        title2: res.data[0].title2,
                        link2: res.data[0].link2,
                        projectDescription2: res.data[0].projectDescription2,
                        title3: res.data[0].title3,
                        link3: res.data[0].link3,
                        projectDescription3: res.data[0].projectDescription3,
                        institute1: res.data[0].institute1,
                        position1: res.data[0].position1,
                        duration1: res.data[0].duration1,
                        experienceDescription1: res.data[0].experienceDescription1,
                        institute2: res.data[0].institute2,
                        position2: res.data[0].position2,
                        duration2: res.data[0].duration2,
                        experienceDescription2: res.data[0].experienceDescription2,
                        skill1: res.data[0].skill1,
                        skill2: res.data[0].skill2,
                        skill3: res.data[0].skill3,
                        skill4: res.data[0].skill4,
                        skill5: res.data[0].skill5,
                        skill6: res.data[0].skill6,
                        interest1: res.data[0].interest1,
                        interest2: res.data[0].interest2,
                        interest3: res.data[0].interest3,
                        interest4: res.data[0].interest4,
                        interest5: res.data[0].interest5,
                        interest6: res.data[0].interest6,
                        refname1:res.data[0].refname1,
                        refpos1:res.data[0].refpos1,
                        refemail1:res.data[0].refemail1,
                        refphone1:res.data[0].refphone1,
                        refname2:res.data[0].refname2,
                        refpos2:res.data[0].refpos2,
                        refemail2:res.data[0].refemail2,
                        refphone2:res.data[0].refphone2,
                    });
                }
            })
    }


    // pdfgen(){
    //     const obj={
    //         url:window.location.href
    //     }
    //     axios.post("http://localhost:5000/pdf/pdfgen",obj)
    //         .then((res)=>{
    //             console.log(res)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    // }
    // printDocument() {
    //     const input = document.getElementById('cv');
    //     html2canvas(input)
    //         .then((canvas) => {
    //             const imgData = canvas.toDataURL('image/png');
    //             const pdf = new jsPDF();
    //             pdf.addImage(imgData, 'JPEG',0,0,200,200);
    //             // pdf.output('dataurlnewwindow');
    //             pdf.save("download.pdf");
    //         })
    //     ;
    // }

    render() {
        return(
            <React.Fragment>
                <Navbar/>
                <h3 className='text-center'>MY CV</h3>
                   <Button onClick={this.createPDF}>PDF</Button>
                <Container id='cv' className="mt-4 border " style={{borderRadius:"10px"}}>
                    {/*<Row className='m-3'>*/}
                    {/*    <Row>*/}
                    {/*    <Avatar alt="Remy Sharp" src="https://thumbs.dreamstime.com/b/corporate-profile-photo-professional-businessman-executive-arms-folded-boardroom-45082954.jpg" style={{width:'100px',height:'100px'}} />*/}
                    {/*    </Row>*/}
                    {/*    <Row>*/}
                    {/*        <h3>Lakshan Rasingolla</h3>*/}
                    {/*    </Row>*/}
                    {/*    <Row>*/}
                    {/*        <span>Career profile</span>*/}
                    {/*    </Row>*/}

                    {/*</Row>*/}
                    <Row>
                        <Col>
                            <Paper elevation={1} style={{padding:"1px",margin:'5px',width:"400px",height:"auto"}}>
                                <h5 style={{color:"#2E86C1",margin:'3px'}} className='text-center'>Profile</h5>
                                <ListItem>
                                    <EmailIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.email}/>
                                </ListItem>
                                <ListItem>
                                    <PhoneIphoneIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.phone}/>
                                </ListItem>
                                <ListItem>
                                    <HomeIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.address}/>
                                </ListItem>
                                <ListItem>
                                    <GitHubIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.github}/>
                                </ListItem>
                                <ListItem>
                                    <LinkedInIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.linkedin}/>
                                </ListItem>

                            </Paper>
                            <Paper elevation={1} style={{padding:"1px",margin:'5px',width:"400px",height:"auto"}}>
                                <h5 style={{color:"#2E86C1",margin:'3px'}} className='text-center'>Academic Qualifications</h5>
                                <ListItem>
                                    <SchoolIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.college} secondary={
                                        <div>
                                            <div>{this.state.qualification1}</div>
                                            <div>{this.state.fromyear1} - {this.state.toyear1}</div>
                                            <div>{this.state.description1}</div>
                                        </div>
                                    }/>
                                </ListItem>
                                <ListItem>
                                    <LocalLibraryIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.school} secondary={
                                        <div>
                                            <div>{this.state.qualification2}</div>
                                            <div>{this.state.fromyear2} - {this.state.toyear2}</div>
                                            <div>{this.state.description2}</div>
                                        </div>
                                    }/>
                                </ListItem>

                            </Paper>
                            <Paper elevation={1} style={{padding:"1px",margin:'5px',width:"400px",height:"auto"}}>
                                <h5 style={{color:"#2E86C1",margin:'3px'}} className='text-center'>Referees</h5>
                                <ListItem>
                                    <PersonIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.refname1} secondary={
                                        <div>
                                            <div>{this.state.refpos1}</div>
                                            <div>{this.state.refemail1}</div>
                                            <div>{this.state.refphone1}</div>
                                        </div>
                                    }/>
                                </ListItem>
                                <ListItem>
                                    <PersonIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.refname2} secondary={
                                        <div>
                                            <div>{this.state.refpos2}</div>
                                            <div>{this.state.refemail2}</div>
                                            <div>{this.state.refphone2}</div>
                                        </div>
                                    }/>
                                </ListItem>

                            </Paper>
                        </Col>
                        <Col>
                            <Paper elevation={1} style={{padding:"1px",margin:'5px',width:"400px",height:"auto"}}>
                                <h5 style={{color:"#2E86C1",margin:'3px'}} className='text-center'>Work Experience</h5>
                                <ListItem>
                                    <WorkIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.institute1} secondary={
                                        <div>
                                            <div>{this.state.position1}</div>
                                            <div>{this.state.duration1}</div>
                                            <div>{this.state.experienceDescription1}</div>
                                        </div>
                                    }/>
                                </ListItem>
                                <ListItem>
                                    <WorkIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.institute2} secondary={
                                        <div>
                                            <div>{this.state.position2}</div>
                                            <div>{this.state.duration2}</div>
                                            <div>{this.state.experienceDescription2}</div>
                                        </div>
                                    }/>
                                </ListItem>

                            </Paper>
                            <Paper elevation={1} style={{padding:"1px",margin:'5px',width:"400px",height:"auto"}}>
                                <h5 style={{color:"#2E86C1",margin:'3px'}} className='text-center'>Projects</h5>
                                <ListItem>
                                    <AssignmentIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.title1} secondary={
                                        <div>
                                            <div>{this.state.link1}</div>
                                            <div>{this.state.projectDescription1}</div>
                                        </div>
                                    }/>
                                </ListItem>
                                <ListItem>
                                    <AssignmentIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.title2} secondary={
                                        <div>
                                            <div>{this.state.link2}</div>
                                            <div>{this.state.projectDescription2}</div>
                                        </div>
                                    }/>
                                </ListItem>
                                <ListItem>
                                    <AssignmentIcon color="primary"/>
                                    <ListItemText style={{marginLeft:'5px'}} primary={this.state.title3} secondary={
                                        <div>
                                            <div>{this.state.link3}</div>
                                            <div>{this.state.projectDescription3}</div>
                                        </div>
                                    }/>
                                </ListItem>

                            </Paper>
                            <Paper elevation={1} style={{padding:"1px",margin:'5px',width:"400px",height:"auto"}}>
                                <h5 style={{color:"#2E86C1",margin:'3px'}} className='text-center'>Skills</h5>
                                <Row>
                                <Col>
                                    <h6 className='text-center' style={{color:"#2E86C1"}} >Soft skills</h6>
                                    <ul>
                                        <li>{this.state.skill1}</li>
                                        <li>{this.state.skill2}</li>
                                        <li>{this.state.skill3}</li>
                                        <li>{this.state.skill4}</li>
                                        <li>{this.state.skill5}</li>
                                        <li>{this.state.skill6}</li>
                                    </ul>
                                </Col>
                                <Col>
                                    <h6 className='text-center' style={{color:"#2E86C1"}}>Technical skills</h6>
                                    <ul>
                                        <li>{this.state.interest1}</li>
                                        <li>{this.state.interest2}</li>
                                        <li>{this.state.interest3}</li>
                                        <li>{this.state.interest4}</li>
                                        <li>{this.state.interest5}</li>
                                        <li>{this.state.interest6}</li>
                                    </ul>
                                </Col>
                                </Row>
                            </Paper>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }


}
export default Profileview;