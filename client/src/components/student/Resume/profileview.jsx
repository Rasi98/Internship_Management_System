import React, {Component} from 'react'
import Navbar from '../Navbar.jsx'

class Profileview extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <React.Fragment>
                <Navbar/>
            </React.Fragment>
        )
    }


}
export default Profileview;