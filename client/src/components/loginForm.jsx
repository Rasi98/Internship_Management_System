import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Loginform extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:'',
            password:''
         }
    }

    handleUsernameChange=(event)=>{
        this.setState({username:event.target.value});
    }
    handlePasswordChange=(event)=>{
        this.setState({password:event.target.value})
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        const user={
            username:this.state.username,
            password:this.state.password
        }
        console.log(user);
    }
    

    render() { 
        return ( 
            <React.Fragment>
                <h3>
                    LOGIN
                <small className="text-muted"> | Internship portal</small>
                </h3>
                <form>
                    <div className='form-group'>        
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="text" className="form-control" placeholder="Enter username" value={this,this.state.username} onChange={this.handleUsernameChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                </form>
            </React.Fragment>
         );
    }
}
 
export default Loginform;