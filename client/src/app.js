import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

import Addcompany from "./components/admin/addCompany";
import Navbar from "./components/admin/Navbar";
import Viewcompany from "./components/admin/viewCompany";
import Home from "./components/admin/home";
import Editcompany from "./components/admin/editCompany";
import Login from "./components/login/login";

const App = () => {
  return (
    <Login></Login>
    // <div>
    //   <Navbar></Navbar>
    //   <div className="content">
    //     <Switch>
    //       <Route path="/edit/:id" component={Editcompany} />
    //       <Route path="/addcompany" component={Addcompany} />
    //       <Route path="/viewcompany" component={Viewcompany} />
    //       <Route path="/" component={Home} />
    //     </Switch>
    //   </div>
    // </div>
  );
};
export default App;
