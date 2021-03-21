import React, {Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Company =props=>(
    <tr>
        <td>{props.company.name}</td>
        <td>{props.company.email}</td>
        <td>{props.company.address}</td>
        <td>{props.company.phone}</td>
        <td>{props.company.vacancies}</td>
        <td>
            <Link to={"/edit/"+props.company._id} className="btn btn-warning">edit</Link>
            <button className='btn btn-danger m-1' onClick={() => { props.deleteCompany(props.company._id) }}>Delete</button>
        </td>
    </tr>
)

class Viewcompany extends Component {
    constructor(props){
        super(props);

        this.deleteCompany=this.deleteCompany.bind(this)
        this.state={
            companies:[]
        };
    }
    
    componentDidMount(){
        axios.get('http://localhost:5000/company/')
        .then(Response=>{
            this.setState({companies:Response.data})
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    deleteCompany(id){
        axios.delete('http://localhost:5000/company/'+id)
        .then(res=>console.log(res.data))
        this.setState({
            companies: this.state.companies.filter(el => el._id !== id)
        })
    }

    companiesList(){
        return this.state.companies.map(currentcompany=>{
            return <Company company={currentcompany} deleteCompany={this.deleteCompany} key={currentcompany._id}/>
        })
    }

    render() { 
        return ( 
           <div className='container mt-4'>
               <h3 className='text-center'>Company List</h3>
               <table className='table'>
                <thead className='thead-light'>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>#Vacancies</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.companiesList()}
                </tbody>
               </table>
           </div>
         )
    }
}
 
export default Viewcompany;