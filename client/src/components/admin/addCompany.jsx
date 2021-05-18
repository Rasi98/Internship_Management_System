import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

class Addcompany extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            name:'',
            email:'',
            address:'',
            phone:'',
        }
    }

    handlenamechange=(e)=>{
        this.setState({name:e.target.value});
    }
    handleemailchange=(e)=>{
        this.setState({email:e.target.value});
    }
    handleaddresschange=(e)=>{
        this.setState({address:e.target.value});
    }
    handlephonechange=(e)=>{   
            this.setState({phone:e.target.value});   
    }
    handlevacancychange=(e)=>{
        this.setState({vacancies:e.target.value});
    }


    handlesubmit=(e)=>{
            const company={
                "name":this.state.name,
                "email":this.state.email,
                "address":this.state.address,
                "phone":this.state.phone,
            }
    
            axios.post('http://localhost:5000/company/addcompany',company)
            .then(res=>{
                const error=res.data.result;
                console.log(res);
        
                if(error!==null){
                    alert(error);
                }
                else{
                    console.log('success');
                    alert('Company Added!'); 
                }
            })

    }

    handleClear=(e)=>{
        this.setState({
            name:'',
            email:'',
            address:'',
            phone:'',
        })
    }
   

    render() { 
        return ( 
            <React.Fragment>
                <div className="container mt-4">
                <h3 className='text-center'>New company</h3>
                <div>
                    <ul className='error'></ul>
                </div>
                <form>
                    <div className="col-5">
                        <div className='form-group'>        
                            <label htmlFor="companyname">Company name</label>
                            <input type="text" id="companyName" className="form-control" placeholder="Enter company name" value={this,this.state.name} onChange={this.handlenamechange} required></input>
                        </div>
                        <div className='form-group'>        
                            <label htmlFor="companyemail">Email</label>
                            <input type="email" id="email" className="form-control" placeholder="Enter company email" value={this,this.state.email} onChange={this.handleemailchange} required></input>
                           
                        </div>
                        <div className='form-group'>        
                            <label htmlFor="companyaddress">Address</label>
                            <input type="text" className="form-control" placeholder="Enter company address" value={this,this.state.address} onChange={this.handleaddresschange}></input>
                        </div>
                        <div className='form-group'>        
                            <label htmlFor="companymobile">Phone No</label><br></br>
                            <input type="number" maxLength="10" id="companyPhone" className="form-control" placeholder="Enter phone no." value={this,this.state.phone} onChange={this.handlephonechange}></input>
                           
                        </div>
                        
                        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handlesubmit}>Submit</button>
                        <button type="button" className="btn btn-outline-secondary btn-lg btn-block" onClick={this.handleClear}>Reset</button>
                        

                    </div>
                </form>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Addcompany;