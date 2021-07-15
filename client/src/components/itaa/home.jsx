import React, { Component } from "react";
import Navbaritaa from "./Navbar";
import {Col, Container, Row} from "react-bootstrap";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Navbaritaa/>
                <h1 className="text-center">ITAA Home</h1>
                <Container>
                    <Row>
                        <Col className="border" sm={8}>sm=8</Col>
                        <Col className="border" sm={4}>sm=4</Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;
