import React, { Component } from "react";
import Navbar from "./Navbar";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import {Type } from 'react-bootstrap-table2-editor';
import cellEditFactory from 'react-bootstrap-table2-editor';
import axios from "axios";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Paper} from "@material-ui/core";
import {CSVLink} from "react-csv";


class StaffInterview extends Component {
    state ={
        datalist:[],
        btnval:"Update",
        data:[],
        columns : [{
            dataField: 'name',
            text: 'Name',
            editable: false
        }, {
            dataField: 'stuno',
            text: 'Stu.No',
            editable: false
        }, {
            dataField: 'email',
            text: 'Email',
            editable: false
        }, {
            dataField: 'interview',
            text: 'Interview',
            editable: false,
            editor: {
                type: Type.SELECT,
                options: [{
                    value: 'Completed',
                    label: 'Completed'
                },{
                    value: 'Pending',
                    label: 'Pending',
                }]
            }
        }, {
            dataField: 'staffintmarks',
            text: 'Result',
            editable: false,
            editor: {
                type: Type.SELECT,
                options: [{
                    value: 'Pending',
                    label: 'Pending'
                },{
                    value: 'A',
                    label: 'A'
                }, {
                    value: 'B',
                    label: 'B'
                }, {
                    value: 'C',
                    label: 'C'
                }, {
                    value: 'D',
                    label: 'D'
                }, {
                    value: 'E',
                    label: 'E'
                }]
            }
        }],
    };

    componentDidMount() {
        this.state.data=[]
        let arry=[]
        axios.get("http://localhost:5000/student/")
            .then((res)=>{
                console.log(res.data)
                res.data.forEach(a=>{
                    let preall=this.state.data
                    let interview={
                        id:a._id,
                        name:a.name,
                        email:a.email,
                        intemail:a.staffintemail,
                        stuno:a.stuno,
                        interview:a.staffInterview,
                        staffintmarks:a.staffintmarks,
                }
                const obj={
                        Name:a.name,
                    Stu_NO:a.stuno,
                    Email:a.email,
                    Interview:a.staffInterview,
                    Marks:a.staffintmarks
                }
                arry.push(obj)
                preall.push(interview)
                    this.setState({
                        data:preall
                    })

                })
                this.setState({datalist:arry})

            })
            .catch((err)=>{
                console.log(err);
            })
    }

    // selectRow = {
    //     mode: 'checkbox',
    //     clickToSelect: true,
    //     onSelect: (row) => {
    //         const stuid=row.id;
    //         axios.post("http://localhost:5000/student/staffinterview/"+ stuid)
    //             .then((res)=>{
    //                 console.log(res.data)
    //                 if(res.data==="updated"){
    //                     //this.state.selectRow.nonSelectable.includes(stuid);
    //                 }
    //             })
    //             .catch((err)=>{
    //                 console.log(err);
    //             })
    //     },
    //     onSelectAll: (isSelect, rows, e) => {
    //         console.log(isSelect);
    //         console.log(rows);
    //         console.log(e);
    //     }
    // };

    onbtnclick=()=> {
        const btnvalue=this.state.btnval
        if(btnvalue==="Update") {
            this.setState({...this.state.columns[4].editable = true})
            this.setState({...this.state.columns[3].editable = true})
            this.setState({btnval:"Save"})
            this.componentDidMount()

        }
        if(btnvalue==="Save"){
            const updatedList=this.node.table.props.data;
            console.log(updatedList)
            axios.post("http://localhost:5000/student/staffinterview",updatedList)
                .then((res)=>{
                    console.log(res.data)
                    if(res.data=="updated"){
                        this.componentDidMount()
                        this.setState({...this.state.columns[4].editable = false})
                        this.setState({...this.state.columns[3].editable = false})
                        this.setState({btnval:"Update"})
                    }
                    else console.log(res.data)
                })
        }
    }



    render() {
        return (
            <div>
                <Navbar/>
                <div className="container mt-4">
                <h3 className="text-center" style={{marginBottom:"20px",fontFamily: 'Assistant'}}>Staff Interview</h3>
                    <Container>
                        <Row style={{ float: "right", marginBottom: "15px" }}>
                            <Col>
                            <Button className="btn btn-sm btn-primary" id="updatebtn" onClick={this.onbtnclick}>{this.state.btnval}</Button>
                                <CSVLink data={this.state.datalist} style={{ margin: "2px", width: "80px" }} className="btn btn-sm btn-info"  filename={"StaffInterview.csv"}>Download</CSVLink>

                            </Col>
                        </Row>
                    </Container>
                    <BootstrapTable
                        keyField="id"
                        hover
                        rowStyle={{backgroundColor:'white'}}
                        ref={ n => this.node = n }
                        data={ this.state.data }
                        columns={ this.state.columns }
                        cellEdit={ cellEditFactory({
                            mode: 'click',
                            blurToSave: true,
                        }) }
                    />
                </div>
            </div>
        );
    }
}

export default StaffInterview;
