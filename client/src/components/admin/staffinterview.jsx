import React, { Component } from "react";
import Navbar from "./Navbar";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";


class StaffInterview extends Component {
    state ={
        data:[],
        columns : [{
            dataField: 'name',
            text: 'Name'
        }, {
            dataField: 'stuno',
            text: 'Stu.No'
        }, {
            dataField: 'email',
            text: 'Email'
        }, {
            dataField: 'interview',
            text: 'Interview'
        }, {
            dataField: 'staffintmarks',
            text: 'Result'
        }],
        selectRow : {
            mode: 'checkbox',
            clickToSelect: true,
            nonSelectable:[],
        },
    };

    componentDidMount() {

        axios.get("http://localhost:5000/student/")
            .then((res)=>{
                console.log(res.data)
                res.data.forEach(a=>{
                    let preall=this.state.data
                    let interview={
                        id:a._id,
                        name:a.name,
                        email:a.email,
                        stuno:a.stuno,
                        interview:a.staffInterview,
                        staffintmarks:a.staffintmarks,
                }
                preall.push(interview)
                    this.setState({
                        data:preall
                    })
                })

                // this.state.data.forEach(item=>{
                //     if(item.interview==="Completed") {
                //         console.log(item.interview)
                //         this.selectRow.nonSelectable.push(item.id);
                //     }
                // })
                // console.log(this.state.selectRow.nonSelectable)
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            const stuid=row.id;
            axios.post("http://localhost:5000/student/staffinterview/"+ stuid)
                .then((res)=>{
                    console.log(res.data)
                    if(res.data==="updated"){
                        this.state.selectRow.nonSelectable.includes(stuid);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        },
        onSelectAll: (isSelect, rows, e) => {
            console.log(isSelect);
            console.log(rows);
            console.log(e);
        }
    };

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container mt-4">
                <h3 className="text-center" style={{marginBottom:"20px"}}>Staff Interview</h3>
                    <BootstrapTable  hover keyField='id' data={this.state.data} columns={ this.state.columns } selectRow={ this.selectRow }  />
                </div>
            </div>
        );
    }
}

export default StaffInterview;
