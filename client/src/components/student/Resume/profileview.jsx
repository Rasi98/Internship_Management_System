import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import HomeIcon from "@material-ui/icons/Home";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import SchoolIcon from "@material-ui/icons/School";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import PersonIcon from "@material-ui/icons/Person";
import WorkIcon from "@material-ui/icons/Work";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Divider, ListItem, ListItemText, Paper } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";

class Profileview extends Component {
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
      refname1: "",
      refpos1: "",
      refemail1: "",
      refphone1: "",
      refname2: "",
      refpos2: "",
      refemail2: "",
      refphone2: "",
      photo:""
    };
  }
  componentDidMount() {
    const stuId = {
      id: this.props.match.params.id,
    };
    console.log("test", stuId);
    axios
      .post("http://localhost:5000/studentprofile/get", stuId)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          res.data.msg.forEach((item) => {
            this.setState({
              exist: true,
              firstname: item.firstname,
              lastname: item.lastname,
              email: item.email,
              phone: item.phone,
              address: item.address,
              github: item.github,
              linkedin: item.linkedin,
              career: item.career,
              college: item.college,
              fromyear1: item.fromyear1,
              toyear1: item.toyear1,
              qualification1: item.qualification1,
              description1: item.description1,
              school: item.school,
              fromyear2: item.fromyear2,
              toyear2: item.toyear2,
              qualification2: item.qualification2,
              description2: item.description2,
              title1: item.title1,
              link1: item.link1,
              projectDescription1: item.projectDescription1,
              title2: item.title2,
              link2: item.link2,
              projectDescription2: item.projectDescription2,
              title3: item.title3,
              link3: item.link3,
              projectDescription3: item.projectDescription3,
              institute1: item.institute1,
              position1: item.position1,
              duration1: item.duration1,
              experienceDescription1: item.experienceDescription1,
              institute2: item.institute2,
              position2: item.position2,
              duration2: item.duration2,
              experienceDescription2: item.experienceDescription2,
              skill1: item.skill1,
              skill2: item.skill2,
              skill3: item.skill3,
              skill4: item.skill4,
              skill5: item.skill5,
              skill6: item.skill6,
              interest1: item.interest1,
              interest2: item.interest2,
              interest3: item.interest3,
              interest4: item.interest4,
              interest5: item.interest5,
              interest6: item.interest6,
              refname1: item.refname1,
              refpos1: item.refpos1,
              refemail1: item.refemail1,
              refphone1: item.refphone1,
              refname2: item.refname2,
              refpos2: item.refpos2,
              refemail2: item.refemail2,
              refphone2: item.refphone2,
              photo:item.photo
            });
          });
        }
      });
  }

  pdfgen() {
    const obj = {
      url: window.location.href,
    };
    axios
      .post("http://localhost:5000/pdf/pdfgen", obj)
      .then((res) => {
        console.log(res.data.result)
        if(res.data.result==='saved'){
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Your cv downloaded successfully",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }



  render() {
    return (
      <React.Fragment>
        <div className="border mx-4 my-4 " style={{ borderRadius: "10px",padding:"2%" }}>
          <Row className='text-right'>
            <Col>
              <Button id="printbutton" className='text-right' onClick={this.pdfgen}>
                PDF
              </Button>
            </Col>
          </Row>
          <Container id="mycv" >
            <img src={this.state.photo} alt='cv photo'/>
            <h3 className="text-center m-3" style={{ color: "#2E86C1" }}>
              {this.state.firstname} {this.state.lastname}
            </h3>
            <Row>
              <Col>
                <center>
                  <Paper
                    elevation={3}
                    style={{
                      padding: "1px",
                      margin: "5px",
                      width: "400px",
                      height: "auto",
                    }}
                  >
                    <div>
                      <h5
                        style={{ color: "#2E86C1", margin: "3px" }}
                        className="text-center"
                      >
                        Profile
                      </h5>
                      <hr style={{ margin: "2%" }} />
                      <ListItem>
                        <EmailIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.email}
                        />
                      </ListItem>
                      <ListItem>
                        <PhoneIphoneIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.phone}
                        />
                      </ListItem>
                      <ListItem>
                        <HomeIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.address}
                        />
                      </ListItem>
                      <ListItem>
                        <GitHubIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.github}
                        />
                      </ListItem>
                      <ListItem>
                        <LinkedInIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.linkedin}
                        />
                      </ListItem>
                    </div>
                  </Paper>
                  <Paper
                    elevation={3}
                    style={{
                      padding: "1px",
                      margin: "5px",
                      width: "400px",
                      height: "auto",
                    }}
                  >
                    <div >
                      <h5
                        style={{ color: "#2E86C1", margin: "3px" }}
                        className="text-center"
                      >
                        Academic Qualifications
                      </h5>
                      <hr style={{ margin: "2%" }} />
                      <ListItem>
                        <SchoolIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.college}
                          secondary={
                            <div>
                              <div>{this.state.qualification1}</div>
                              <div>
                                {this.state.fromyear1} - {this.state.toyear1}
                              </div>
                              <div>{this.state.description1}</div>
                            </div>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <LocalLibraryIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.school}
                          secondary={
                            <div>
                              <div>{this.state.qualification2}</div>
                              <div>
                                {this.state.fromyear2} - {this.state.toyear2}
                              </div>
                              <div>{this.state.description2}</div>
                            </div>
                          }
                        />
                      </ListItem>
                    </div>
                  </Paper>
                  <Paper
                    elevation={3}
                    style={{
                      padding: "1px",
                      margin: "5px",
                      width: "400px",
                      height: "auto",
                    }}
                  >
                    <div>
                      <h5
                        style={{ color: "#2E86C1", margin: "3px" }}
                        className="text-center"
                      >
                        Referees
                      </h5>
                      <hr style={{ margin: "2%" }} />
                      <ListItem>
                        <PersonIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.refname1}
                          secondary={
                            <div>
                              <div>{this.state.refpos1}</div>
                              <div>{this.state.refemail1}</div>
                              <div>{this.state.refphone1}</div>
                            </div>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <PersonIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.refname2}
                          secondary={
                            <div>
                              <div>{this.state.refpos2}</div>
                              <div>{this.state.refemail2}</div>
                              <div>{this.state.refphone2}</div>
                            </div>
                          }
                        />
                      </ListItem>
                    </div>
                  </Paper>
                </center>
              </Col>
              <Col>
                <center>
                  <Paper
                    elevation={3}
                    style={{
                      padding: "1px",
                      margin: "5px",
                      width: "400px",
                      height: "auto",
                    }}
                  >
                    <div>
                      <h5
                        style={{ color: "#2E86C1", margin: "3px" }}
                        className="text-center"
                      >
                        Work Experience
                      </h5>
                      <hr style={{ margin: "2%" }} />
                      <ListItem>
                        <WorkIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.institute1}
                          secondary={
                            <div>
                              <div>{this.state.position1}</div>
                              <div>{this.state.duration1}</div>
                              <div>{this.state.experienceDescription1}</div>
                            </div>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <WorkIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.institute2}
                          secondary={
                            <div>
                              <div>{this.state.position2}</div>
                              <div>{this.state.duration2}</div>
                              <div>{this.state.experienceDescription2}</div>
                            </div>
                          }
                        />
                      </ListItem>
                    </div>
                  </Paper>
                  <Paper
                    elevation={3}
                    style={{
                      padding: "1px",
                      margin: "5px",
                      width: "400px",
                      height: "auto",
                    }}
                  >
                    <div >
                      <h5
                        style={{ color: "#2E86C1", margin: "3px" }}
                        className="text-center"
                      >
                        Projects
                      </h5>
                      <hr style={{ margin: "2%" }} />
                      <ListItem>
                        <AssignmentIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.title1}
                          secondary={
                            <div>
                              <div>{this.state.link1}</div>
                              <div>{this.state.projectDescription1}</div>
                            </div>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <AssignmentIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.title2}
                          secondary={
                            <div>
                              <div>{this.state.link2}</div>
                              <div>{this.state.projectDescription2}</div>
                            </div>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <AssignmentIcon color="primary" />
                        <ListItemText
                          style={{ marginLeft: "5px" }}
                          primary={this.state.title3}
                          secondary={
                            <div>
                              <div>{this.state.link3}</div>
                              <div>{this.state.projectDescription3}</div>
                            </div>
                          }
                        />
                      </ListItem>
                    </div>
                  </Paper>
                  <Paper
                    elevation={3}
                    style={{
                      padding: "1px",
                      margin: "5px",
                      width: "400px",
                      height: "auto",
                    }}
                  >
                    <div>
                      <h5
                        style={{ color: "#2E86C1", margin: "3px" }}
                        className="text-center"
                      >
                        Skills
                      </h5>
                      <hr style={{ margin: "2%" }} />
                      <Row>
                        <Col>
                          <h6
                            className="text-center"
                            style={{ color: "#2E86C1" }}
                          >
                            Soft skills
                          </h6>
                          <ul className='text-left'>
                            <li>{this.state.skill1}</li>
                            <li>{this.state.skill2}</li>
                            <li>{this.state.skill3}</li>
                            <li>{this.state.skill4}</li>
                            <li>{this.state.skill5}</li>
                            <li>{this.state.skill6}</li>
                          </ul>
                        </Col>
                        <Col>
                          <h6
                            className="text-center"
                            style={{ color: "#2E86C1" }}
                          >
                            Technical skills
                          </h6>
                          <ul className='text-left'>
                            <li>{this.state.interest1}</li>
                            <li>{this.state.interest2}</li>
                            <li>{this.state.interest3}</li>
                            <li>{this.state.interest4}</li>
                            <li>{this.state.interest5}</li>
                            <li>{this.state.interest6}</li>
                          </ul>
                        </Col>
                      </Row>
                    </div>
                  </Paper>
                </center>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
export default Profileview;
