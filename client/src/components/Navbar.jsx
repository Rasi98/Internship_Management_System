import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

class Navbar extends Component {
   
    render() { 
        return ( 
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Intership Portal</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                <a className="nav-item nav-link" href="#">Users</a>
                <a className="nav-item nav-link" href="#">Students</a>
                <a className="nav-item nav-link" href="#">Companies</a>
                <a className="nav-item nav-link" href="#">Allocate</a>
                <a className="nav-item nav-link" href="#">Report</a>
              </div>
            </div>
          </nav>
         );
    }
}
 
export default Navbar;