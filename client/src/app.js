import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Addcompany from './components/addCompany'
import Navbar from './components/Navbar'
import Viewcompany from './components/viewCompany'
import Home from './components/home'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'


function App(){
    return(
        <React.Fragment>
            <Router>
                <div>
                <Navbar></Navbar>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/addcompany" component={Addcompany}/>
                    <Route path="/viewcompany" component={Viewcompany}/>
                </Switch>
                
                </div>
            </Router>
            
        </React.Fragment>
        
    );
}
export default App;