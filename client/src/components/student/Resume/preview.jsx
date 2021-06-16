import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import Navbarstd from "../Navbar";

//print cv
function createPDF() {
  // get elements of report data
  var cv = document.getElementById("cv").innerHTML;

  var style = "<style>";
  style =
    style + "table {width: 100%;font: 17px Calibri;} body{font-size:12px}";
  style =
    style +
    "table, th, td {border: solid 1px #DDD;color: black ;border-collapse: collapse;";
  style = style + "padding: 2px 3px;text-align: center;}";
  style = style + "</style>";

  // CREATE A WINDOW OBJECT.
  var win = window.open("", "", "height=700,width=700");

  win.document.write(
    '<html><head><link rel="stylesheet" href="./css/manager-add-style.css" />'
  );
  win.document.write("<title>Curriculum Vitae</title>"); // <title> FOR PDF HEADER.
  win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
  win.document.write("</head>");
  win.document.write(cv);
  // THE TABLE CONTENTS INSIDE THE BODY TAG.
  win.document.write("</body></html>");

  win.document.close(); // CLOSE THE CURRENT WINDOW.

  win.print(); // PRINT THE CONTENTS.
}

class PreviewProfile extends Component {
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
    };
  }
  componentDidMount() {
    const email = this.props.match.params.email;
    console.log(email);
    axios.get("http://localhost:5000/studentprofile/" + email).then((res) => {
      //console.log(Response);
      const profile = res.data;
      console.log(profile);
      this.setState({
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        email: res.data.email,
        phone: res.data.phone,
        address: res.data.address,
        github: res.data.github,
        linkedin: res.data.linkedin,
        career: res.data.career,
        college: res.data.college,
        fromyear1: res.data.fromyear1,
        toyear1: res.data.toyear1,
        qualification1: res.data.qualification1,
        description1: res.data.description1,
        school: res.data.school,
        fromyear2: res.data.fromyear2,
        toyear2: res.data.toyear2,
        qualification2: res.data.qualification2,
        description2: res.data.description2,
        title1: res.data.title1,
        link1: res.data.link1,
        projectDescription1: res.data.projectDescription1,
        title2: res.data.title2,
        link2: res.data.link2,
        projectDescription2: res.data.projectDescription2,
        title3: res.data.title3,
        link3: res.data.link3,
        projectDescription3: res.data.projectDescription3,
        institute1: res.data.institute1,
        position1: res.data.position1,
        duration1: res.data.duration1,
        experienceDescription1: res.data.experienceDescription1,
        institute2: res.data.institute2,
        position2: res.data.position2,
        duration2: res.data.duration2,
        experienceDescription2: res.data.experienceDescription2,
        skill1: res.data.skill1,
        skill2: res.data.skill2,
        skill3: res.data.skill3,
        skill4: res.data.skill4,
        skill5: res.data.skill5,
        skill6: res.data.skill6,
        interest1: res.data.interest1,
        interest2: res.data.interest2,
        interest3: res.data.interest3,
        interest4: res.data.interest4,
        interest5: res.data.interest5,
        interest6: res.data.interest6,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Navbarstd />
        </div>
        <div>
          <Button
            variant="info"
            style={{ float: "right", margin: "10px" }}
            onClick={createPDF}
          >
            Download
          </Button>
        </div>
        <div id="cv">
          <div style={{ padding: "left,0px", marginTop: "10px" }}>
            <h1 style={{ fontSize: "36pt" }}>
              <i>
                <span style={{ color: "#3498DB" }}>Curriculum vitae</span>
              </i>
            </h1>
          </div>
          <div style={{ padding: "50px", marginTop: "3px" }}>
            <h1 style={{ fontSize: "36pt" }}>
              <i>
                <span style={{ color: "#2E86C1 " }}>
                  {this.state.firstname + " " + this.state.lastname}
                </span>
              </i>
            </h1>
          </div>
          <div
            id="content"
            style={{
              backgroundColor: "white",
              float: "left",
              width: "700px",
              height: "1800px",
            }}
          >
            <pre />
            <div>
              <p>
                Email : {this.state.email}
                <br />
                Mobile : {this.state.phone}
                <br />
                Address : {this.state.address}
                <br />
                github : {this.state.github}
                <br />
                linkedin : {this.state.linkedin}
              </p>
            </div>

            <div
              id="menu"
              style={{
                backgroundColor: "white",
                width: "150px",
                height: "100%",
                float: "left",
              }}
            ></div>
            <hr />
            <h1 style={{ fontSize: "15pt" }}>
              <i>PROFILE</i>
            </h1>
            {this.state.career}
            <hr />
            <h1 style={{ fontSize: "15pt" }}>
              <i>EDUCATIONAL QUALIFICATIONS</i>
            </h1>
            <div>
              <ul>
                <li>
                  University : {this.state.college} | {this.state.fromyear1} -{" "}
                  {this.state.toyear1}{" "}
                </li>
                <li>Degree : {this.state.qualification1}</li>
                <li>Description : {this.state.description1}</li>
              </ul>
            </div>
            <br />
            <div>
              <ul>
                <li>
                  School : {this.state.school} | {this.state.fromyear2} -{" "}
                  {this.state.toyear2}
                </li>
                <li>Exam : {this.state.qualification2}</li>
                <li>Results : {this.state.description2}</li>
              </ul>
            </div>
            <hr />
            <h1 style={{ fontSize: "15pt" }}>
              <i>PROJECTS</i>
            </h1>
            <div>
              <ul>
                <li>Title : {this.state.title1}</li>
                <li>Link : {this.state.link1}</li>
                <li>Description : {this.state.projectDescription1}</li>
              </ul>
            </div>
            <br />
            <div>
              <ul>
                <li>Title : {this.state.title2}</li>
                <li>Link : {this.state.link2}</li>
                <li>Description : {this.state.projectDescription2}</li>
              </ul>
            </div>
            <br />
            <div>
              <ul>
                <li>Title : {this.state.title3}</li>
                <li>Link : {this.state.link3}</li>
                <li>Description : {this.state.projectDescription3}</li>
              </ul>
            </div>
            <hr />
            <h1 style={{ fontSize: "15pt" }}>
              <i>WORK EXPERIENCE</i>
            </h1>
            <div>
              <ul>
                <li>Company : {this.state.institute1}</li>
                <li>Position : {this.state.position1}</li>
                <li>Duration : {this.state.duration1}</li>
              </ul>
            </div>
            <br />
            <div>
              <ul>
                <li>Company : {this.state.institute2}</li>
                <li>Position : {this.state.position2}</li>
                <li>Duration : {this.state.duration2}</li>
              </ul>
            </div>
            <hr />

            <Row>
              <Col xs={6}>
                {" "}
                <h1 style={{ fontSize: "15pt" }}>
                  <i>SKILLS</i>
                </h1>
                <ul>
                  <li>{this.state.skill1}</li>
                  <li>{this.state.skill2}</li>
                  <li>{this.state.skill3}</li>
                  <li>{this.state.skill4}</li>
                  <li>{this.state.skill5}</li>
                  <li>{this.state.skill6}</li>
                </ul>
              </Col>
              <Col xs={6}>
                {" "}
                <h1 style={{ fontSize: "15pt" }}>
                  <i> INTERESTS</i>
                </h1>
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default PreviewProfile;
