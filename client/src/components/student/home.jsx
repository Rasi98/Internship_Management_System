import React, { Component } from "react";
import Navbarstd from "../student/Navbar";
import {Container, Row,Col} from "react-bootstrap";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Navbarstd />
                <h1>Profile picture</h1>
                 <Container className="mt-4 border" style={{padding:"15px",borderRadius:"10px"}}>
                     <Row>
                             <Col>
                                 <p>Name :</p>
                             </Col>
                             <Col>
                                 <p>GPA :</p>
                             </Col>
                     </Row>
                     <Row>
                         <Col>
                             <p>Specialization path :</p>
                         </Col>
                         <Col>
                             <p>Interest areas :</p>
                         </Col>
                     </Row>
                     <Row>
                         <Col>
                             <p>Finalized company :</p>
                         </Col>
                         <Col>
                             <p>ITAA :</p>
                         </Col>
                     </Row>
                     <Row>
                         <Col>
                             <p>ITA :</p>
                         </Col>
                         <Col>
                             <p>No of interviews faced :</p>
                         </Col>
                     </Row>
                 </Container>
            </div>
        );
    }
}

export default Home;
