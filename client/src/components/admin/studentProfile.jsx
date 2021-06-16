import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import AdminNavbar from "./Navbar";

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

class StudentProfile extends Component {
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
    //console.log(this.props.match.params.email);
    const email = "lakshan@gmail.com";
    axios
      .get(
        "http://localhost:5000/studentprofile/" + this.props.match.params.email
      )
      .then((Response) => {
        console.log(Response);

        this.setState({
          firstname: Response.data.firstname,
          lastname: Response.data.lastname,
          email: Response.data.email,
          phone: Response.data.phone,
          address: Response.data.address,
          github: Response.data.github,
          linkedin: Response.data.linkedin,
          career: Response.data.career,
          college: Response.data.college,
          fromyear1: Response.data.fromyear1,
          toyear1: Response.data.toyear1,
          qualification1: Response.data.qualification1,
          description1: Response.data.description1,
          school: Response.data.school,
          fromyear2: Response.data.fromyear2,
          toyear2: Response.data.toyear2,
          qualification2: Response.data.qualification2,
          description2: Response.data.description2,
          title1: Response.data.title1,
          link1: Response.data.link1,
          projectDescription1: Response.data.projectDescription1,
          title2: Response.data.title2,
          link2: Response.data.link2,
          projectDescription2: Response.data.projectDescription2,
          title3: Response.data.title3,
          link3: Response.data.link3,
          projectDescription3: Response.data.projectDescription3,
          institute1: Response.data.institute1,
          position1: Response.data.position1,
          duration1: Response.data.duration1,
          experienceDescription1: Response.data.experienceDescription1,
          institute2: Response.data.institute2,
          position2: Response.data.position2,
          duration2: Response.data.duration2,
          experienceDescription2: Response.data.experienceDescription2,
          skill1: Response.data.skill1,
          skill2: Response.data.skill2,
          skill3: Response.data.skill3,
          skill4: Response.data.skill4,
          skill5: Response.data.skill5,
          skill6: Response.data.skill6,
          interest1: Response.data.interest1,
          interest2: Response.data.interest2,
          interest3: Response.data.interest3,
          interest4: Response.data.interest4,
          interest5: Response.data.interest5,
          interest6: Response.data.interest6,
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <AdminNavbar />
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
                <span style={{ color: "#3498DB" }}>Curriculum Vitae</span>
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

export default StudentProfile;
