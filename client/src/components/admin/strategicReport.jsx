import React, { Component } from "react";
import Navbar from "./Navbar";
import {Paper} from "@material-ui/core";
import {Button, Col, Container, Row} from "react-bootstrap";


class strategicReport extends Component {
  state = {};

  componentDidMount() {
      document.body.style='background: #E5E7E9;'
  }

    createPDF() {
        // get elements of report data
        var report1 = document.getElementById("report1").innerHTML;

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

        win.document.write("<title>Report 1</title>"); // <title> FOR PDF HEADER.
        win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write("</head>");
        win.document.write(report1);
        // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write("</body></html>");

        win.document.close(); // CLOSE THE CURRENT WINDOW.

        //win.print(); // PRINT THE CONTENTS.
    }

    render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
          <h3 className="text-center my-3 mb-3" style={{fontFamily: 'Assistant'}}>Report</h3>
          <Container>
              <Row className='text-right'>
                  <Col>
                      <Button onClick={this.createPDF}>Download</Button>
                  </Col>
              </Row>
                  <Paper id='report1' elevation={4} className='mx-3 my-3'>
                      <iframe  width="100%" height="541.25"
                              src="https://app.powerbi.com/reportEmbed?reportId=bb5c8340-a5f9-450f-8760-e0b81f38d194&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"
                              frameBorder="0" allowFullScreen="true"></iframe>
                  </Paper>
          </Container>
      </React.Fragment>
    );
  }
}

export default strategicReport;
