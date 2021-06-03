import React, { Component } from "react";
import { TextField, Button, Container, Divider } from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import EmailIcon from "@material-ui/icons/Email";
import SchoolIcon from "@material-ui/icons/School";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PhoneIcon from "@material-ui/icons/Phone";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InputAdornment from "@material-ui/core/InputAdornment";
import DescriptionIcon from "@material-ui/icons/Description";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import BusinessIcon from "@material-ui/icons/Business";
import LinkIcon from "@material-ui/icons/Link";
import TitleIcon from "@material-ui/icons/Title";
import { Row, Col } from "react-bootstrap";
import { Paper, Grid } from "@material-ui/core";
import axios from "axios";
import "date-fns";

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      github: "",
      linkedin: "",

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
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onsubmit = (e) => {
    const Studentprofile = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
      github: this.state.github,
      linkedin: this.state.linkedin,
      college: this.state.college,
      fromyear1: this.state.fromyear1,
      toyear1: this.state.toyear1,
      qualification1: this.state.qualification1,
      description1: this.state.description1,
      school: this.state.school,
      fromyear2: this.state.fromyear2,
      toyear2: this.state.toyear2,
      qualification2: this.state.qualification2,
      description2: this.state.description2,
      title1: this.state.title1,
      link1: this.state.link1,
      projectDescription1: this.state.projectDescription1,
      title2: this.state.title2,
      link2: this.state.link2,
      projectDescription2: this.state.projectDescription2,
      title3: this.state.title3,
      link3: this.state.link3,
      projectDescription3: this.state.projectDescription3,
      institute1: this.state.institute1,
      position1: this.state.position1,
      duration1: this.state.duration1,
      experienceDescription1: this.state.experienceDescription1,
      institute2: this.state.institute2,
      position2: this.state.position2,
      duration2: this.state.duration2,
      experienceDescription2: this.state.experienceDescription2,
      skill1: this.state.skill1,
      skill2: this.state.skill2,
      skill3: this.state.skill3,
      skill4: this.state.skill4,
      skill5: this.state.skill5,
      skill6: this.state.skill6,
      interest1: this.state.interest1,
      interest2: this.state.interest2,
      interest3: this.state.interest3,
      interest4: this.state.interest4,
      interest5: this.state.interest5,
      interest6: this.state.interest6,
    };
    console.log(Studentprofile);
    axios
      .post(
        "http://localhost:5000/student/profile/addstudentprofile",
        Studentprofile
      )
      .then((res) => {
        const response = res.result;
        console.log(response);

        if (response == "success") {
          alert("success");
        } else {
          console.log("Error occured!");
        }
      });
  };

  render() {
    //const classes = this.styles();
    return (
      <React.Fragment>
        <Paper style={{ marginTop: "20px" }}>
          <Card>
            <CardHeader title="Personal Details" />
          </Card>
          <CardContent>
            <div className="Container text-center">
              <Grid container spacing={2} alignItems="center" lg={12}>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="firstname"
                    label="First Name"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.firstname)}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    label="Last Name"
                    variant="outlined"
                    style={{ width: "80%" }}
                    name="lastname"
                    required
                    value={(this, this.state.lastname)}
                    onChange={this.handleChange}
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    label="Email"
                    variant="outlined"
                    name="email"
                    required
                    style={{ alignItems: "left", width: "80%" }}
                    value={(this, this.state.email)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item lg={6} xs={12} sm={12} md={6}>
                  <TextField
                    margin="dense"
                    label="Phone Number"
                    variant="outlined"
                    name="phone"
                    style={{ alignItems: "left", width: "80%" }}
                    value={(this, this.state.phone)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    label="GitHub"
                    variant="outlined"
                    name="github"
                    style={{ alignItems: "left", width: "80%" }}
                    value={(this, this.state.github)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <GitHubIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    label="Linked In"
                    variant="outlined"
                    name="linkedin"
                    style={{ alignItems: "left", width: "80%" }}
                    value={(this, this.state.linkedin)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LinkedInIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* <Container style={{ marginTop: "15px" }}>
              <Row>
                <Col lg={3} xs={0} />
                <Col lg={3} xs={5}>
                  <Button
                    variant="contained"
                    color="secondary"
                    //onClick={}
                    disabled
                    startIcon={<NavigateBeforeIcon />}
                  >
                    Back
                  </Button>
                </Col>
                <Col lg={3} xs={5}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.onsubmit}
                    endIcon={<NavigateNextIcon />}
                  >
                    Next
                  </Button>
                </Col>
                <Col lg={3} xs={1} />
              </Row>
            </Container> */}
              {/* <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.createAndDownloadPDF}
                  endIcon={<GetAppIcon />}
                >
                  Generate PDF
                </Button> */}
            </div>
          </CardContent>
        </Paper>
        //........................Education..................................................
        <Paper style={{ marginTop: "20px" }}>
          <Card>
            <CardHeader title="Education Details" />
          </Card>
          <CardContent>
            <div className="text-center">
              <Grid container spacing={2} alignItems="center" lg={12}>
                <Grid item md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="college"
                    label="Unviersity"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.college)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <SchoolIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="fromyear1"
                    label="From Year"
                    type="date"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.fromyear1)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DateRangeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="toyear1"
                    type="date"
                    label="To Year"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.toyear1)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DateRangeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    label="Qualification"
                    variant="outlined"
                    style={{ width: "80%" }}
                    name="qualification1"
                    required
                    value={(this, this.state.qualification1)}
                    onChange={this.handleChange}
                  />
                </Grid>

                <Grid item md={8} sm={12} xs={12} lg={8}>
                  <TextField
                    margin="dense"
                    label="Description"
                    variant="outlined"
                    style={{ width: "90%" }}
                    name="description1"
                    required
                    value={(this, this.state.description1)}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <br />
              <Divider />
              <br />
              <Grid container spacing={2} alignItems="center" lg={12}>
                <Grid item md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="school"
                    label="School"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.school)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SchoolIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="fromyear2"
                    label="From Year"
                    type="date"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.fromyear2)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DateRangeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={4} sm={6} xs={12} lg={4}>
                  {/* <CustomDatePicker
                  name={'toyear2'}
                  label={'To Year'}
                  value={values.toyear2}
                /> */}
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="toyear2"
                    label="To Year"
                    type="date"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.toyear2)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DateRangeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    label="Qualification"
                    variant="outlined"
                    style={{ width: "80%" }}
                    name="qualification2"
                    required
                    value={(this, this.state.qualification2)}
                    onChange={this.handleChange}
                  />
                </Grid>

                <Grid item md={8} sm={8} xs={8} lg={8}>
                  <TextField
                    margin="dense"
                    label="Description"
                    variant="outlined"
                    style={{ width: "90%" }}
                    name="description2"
                    required
                    value={(this, this.state.description2)}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Paper>
        //...................Experience...........................................
        <Paper style={{ marginTop: "20px" }}>
          <Card>
            <CardHeader title="Experience Details" />
          </Card>
          <CardContent>
            <div className="text-center">
              <Grid container spacing={2} alignItems="center" lg={12}>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  alignItems="flex-end"
                  alignContent="flex-end"
                >
                  <h5>
                    <CheckCircleIcon />
                    <span className="pl-3">Experience 1</span>
                  </h5>
                </Grid>
                <Grid item xs={0} lg={8} />

                <Grid item md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="institute1"
                    label="Institue/Organisation"
                    style={{ width: "90%" }}
                    required
                    value={(this, this.state.institute1)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <BusinessIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="position1"
                    label="Position"
                    style={{ width: "90%" }}
                    required
                    value={(this, this.state.position1)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <EventSeatIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="duration1"
                    label="Duration"
                    style={{ width: "90%" }}
                    required
                    value={(this, this.state.duration1)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <TimelapseIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    label="Description"
                    variant="outlined"
                    style={{ width: "97%" }}
                    name="experienceDescription1"
                    required
                    value={(this, this.state.experienceDescription1)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <br />
              <Divider />
              <br />
              <Grid container spacing={2} alignItems="flex-start" lg={12}>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  alignItems="flex-end"
                  alignContent="flex-end"
                >
                  <h5>
                    <CheckCircleIcon />
                    <span className="pl-3">Experience 2</span>
                  </h5>
                </Grid>
                <Grid item xs={0} lg={8} />
                <br />
                <Grid item md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="institute2"
                    label="Institue/Organisation"
                    style={{ width: "90%" }}
                    required
                    value={(this, this.state.institute2)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <BusinessIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="position2"
                    label="Position"
                    style={{ width: "90%" }}
                    required
                    value={(this, this.state.position2)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <EventSeatIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="duration2"
                    label="Duration"
                    style={{ width: "90%" }}
                    required
                    value={(this, this.state.duration2)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <TimelapseIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    label="Description"
                    variant="outlined"
                    style={{ width: "97%" }}
                    rows={3}
                    name="experienceDescription2"
                    required
                    value={(this, this.state.experienceDescription2)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Paper>
        //...................Project.........................
        <Paper style={{ marginTop: "20px" }}>
          <Card>
            <CardHeader title="Projects Developed" />
          </Card>
          <CardContent>
            <div className="text-center">
              <Grid container spacing={2} alignItems="center" lg={12}>
                <Grid item xs={12} lg={12}>
                  <h5>Project 1</h5>
                </Grid>
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="title1"
                    label="Title"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.title1)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <TitleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="link1"
                    label="Link"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.link1)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <LinkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="projectDescription1"
                    label="Description"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.projectDescription1)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <br />
              <Divider />
              <br />
              <Grid container spacing={2} alignItems="center" lg={12}>
                <Grid item xs={12} lg={12}>
                  <h5>Project 2</h5>
                </Grid>
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="title2"
                    label="Title"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.title2)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <TitleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="link2"
                    label="Link"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.link2)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <LinkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="projectDescription2"
                    label="Description"
                    style={{ width: "80%" }}
                    required
                    value={(this, this.state.projectDescription2)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <br />
              <Divider />
              <br />
              <Grid container spacing={2} alignItems="center" lg={12}>
                <Grid item xs={12} lg={12}>
                  <h5>Project 3</h5>
                </Grid>
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="title3"
                    label="Title"
                    style={{ width: "80%" }}
                    value={(this, this.state.title3)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <TitleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="link3"
                    label="Link"
                    style={{ width: "80%" }}
                    value={(this, this.state.link3)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <LinkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="projectDescription3"
                    label="Description"
                    style={{ width: "80%" }}
                    value={(this, this.state.projectDescription3)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Paper>
        //.................extra..............................
        <Paper style={{ marginTop: "20px" }}>
          <Card>
            <CardHeader title="Extra Details" />
          </Card>
          <CardContent>
            <div className="text-center">
              <Grid container spacing={2} alignItems="center" lg={12}>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  alignItems="flex-end"
                  alignContent="flex-end"
                >
                  <h5>
                    <CheckCircleIcon />
                    <span className="pl-3">Skills/Languages</span>
                  </h5>
                </Grid>
                <Grid item xs={0} lg={8} />
                <br />
                <Grid item md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="skill1"
                    label="Skill 1"
                    style={{ width: "90%" }}
                    value={(this, this.state.skill1)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="skill2"
                    label="Skill 2"
                    style={{ width: "90%" }}
                    value={(this, this.state.skill2)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="skill3"
                    label="Skill 3"
                    style={{ width: "90%" }}
                    value={(this, this.state.skill3)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="skill4"
                    label="Skill 4"
                    style={{ width: "90%" }}
                    value={(this, this.state.skill4)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>

                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="skill5"
                    label="Skill 5"
                    style={{ width: "90%" }}
                    value={(this, this.state.skill5)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>

                <Grid item md={12} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    label="Skill 6"
                    variant="outlined"
                    style={{ width: "90%" }}
                    name="skill6"
                    value={(this, this.state.skill6)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>
              </Grid>
              <br />
              <Divider />
              <br />
              <Grid container spacing={2} alignItems="flex-start" lg={12}>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  alignItems="flex-end"
                  alignContent="flex-end"
                >
                  <h5>
                    <CheckCircleIcon />
                    <span className="pl-3">Interest</span>
                  </h5>
                </Grid>
                <Grid item xs={0} lg={8} />
                <br />
                <Grid item md={12} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    label="Interest 1"
                    variant="outlined"
                    style={{ width: "90%" }}
                    name="interest1"
                    value={(this, this.state.interest1)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    label="Interest 2"
                    variant="outlined"
                    style={{ width: "90%" }}
                    name="interest2"
                    value={(this, this.state.interest2)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    label="Interest 3"
                    variant="outlined"
                    style={{ width: "90%" }}
                    name="interest3"
                    value={(this, this.state.interest3)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    label="Interest 4"
                    variant="outlined"
                    style={{ width: "90%" }}
                    name="interest4"
                    value={(this, this.state.interest4)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    label="Interest 5"
                    variant="outlined"
                    style={{ width: "90%" }}
                    name="interest5"
                    value={(this, this.state.interest5)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    label="Interest 6"
                    variant="outlined"
                    style={{ width: "90%" }}
                    name="interest6"
                    value={(this, this.state.interest6)}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </CardContent>
          <Container style={{ marginTop: "15px" }}>
            <Row>
              <Col xs={4} />
              <Col xs={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleChange}
                  endIcon={<NavigateNextIcon />}
                >
                  Next
                </Button>
              </Col>
              <Col xs={4} />
            </Row>
            <br />
          </Container>
        </Paper>
      </React.Fragment>
    );
  }
}

export default ProfileComponent;
