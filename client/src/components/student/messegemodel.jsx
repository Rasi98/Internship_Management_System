import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Container from "@material-ui/core/Container";
import MessageIcon from '@material-ui/icons/Message';

class Messegemodel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgarry:[]
    };
  }

  componentDidMount() {
    let arry=[]
    const jwt = localStorage.getItem("token");
    const stuid = jwtDecode(jwt)._id;
    const stuId = {
      id: stuid,
    };
    axios
      .post("http://localhost:5000/studentprofile/get", stuId)
      .then((res) => {
        console.log("result",res.data.msg);
        res.data.msg.forEach((item)=>{
          arry=item.comment
        })
        this.setState({msgarry:arry})
        console.log("myarry",this.state.msgarry)
      }).catch((err)=>{
      console.log(err)
    })

  }

  MSGList(){
    return this.state.msgarry.map((a)=>{
      return(
          <div className='border m-2' style={{borderRadius:'5px'}}>
              <span className='pl-3'>{a}</span>
          </div>
      )
    })
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"><MessageIcon className='mr-2'/>Messeges</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {this.MSGList()}
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}
export default Messegemodel;
