import React, { Component } from "react";
import Navbarstd from "../student/Navbar";
import {Paper} from "@material-ui/core";
import {Container, Row} from "react-bootstrap";
import axios from "axios";
import jwtDecode from "jwt-decode";

class Internship extends Component {
  constructor(props) {
    super(props);
    this.state = {
        comlist:[],
        totalallo:''
    };
  }
  componentDidMount() {
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


    render() {
    return (
      <React.Fragment>
          <Navbarstd />
        <h1 className='text-center'>Internship</h1>
          <div className='container' style={{width:'50%'}}>
          <Paper elevation={3} style={{padding:'10px'}}>
                  <span>Total No of Allocations : {this.state.totalallo}</span>
              <Row>
            <Container>{this.state.comlist.map((com)=>(
                <Container id={com._id}  className="border m-1" style={{borderRadius:"5px",backgroundColor:this.colorchange(com.status)}}>
                    <div>
                        <Row className="pl-2 pt-2"> <h6>{com.name}</h6></Row>
                        <Row className="pl-2 pb-2"><span style={{fontSize:"12px"}}>{com.status}</span></Row>
                    </div>
                </Container>
            ))}
            </Container>
              </Row>
          </Paper>
          </div>
      </React.Fragment>
    );
  }
}

export default Internship;
