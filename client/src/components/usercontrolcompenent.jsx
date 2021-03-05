import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

class Usercontrol extends Component {
    render() { 
        return ( 
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Student</a>
                <a class="dropdown-item active" href="#">ITAA</a>
                <a class="dropdown-item" href="#">ITPC</a>
                <a class="dropdown-item" href="#">ITA</a>
            </div>
         );
    }
}
 
export default Usercontrol;