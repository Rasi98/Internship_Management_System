import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import Addcompany from './components/addCompany'
import Navbar from './components/Navbar'
import Viewcompany from './components/viewCompany'
import Home from './components/home'
import Editcompany from './components/editCompany'


function App(){
    return(
        <React.Fragment>
            <Router>
                <div>
                <Navbar></Navbar>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/edit/:id" component={Editcompany} />
                    <Route path="/addcompany" component={Addcompany}/>
                    <Route path="/viewcompany" component={Viewcompany}/>
                </Switch>
                
                </div>
            </Router>
            
        </React.Fragment>
        
    );
}
export default App;