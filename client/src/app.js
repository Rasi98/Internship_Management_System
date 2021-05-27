import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

import Addcompany from "./components/admin/addCompany";
import Viewcompany from "./components/admin/viewCompany";
import Home from "./components/admin/home";
import Editcompany from "./components/admin/editCompany";
import Studentprofile from "./components/admin/studentProfile";
import ITA from "./components/admin/usercontrol/ita";
import ITAA from "./components/admin/usercontrol/itaa";
import ITPC from "./components/admin/usercontrol/itpc";
import Student from "./components/admin/usercontrol/student";
import AllocateCompany from "./components/admin/allocateCompany";
import AllocateITAA from "./components/admin/allocateITAA";
import Report from "./components/admin/strategicReport";
import SignIn from "./components/login/login";
// import Edititpc from "./components/admin/usercontrol/edititpc";

const App = () => {
  return (
    <div className="content">
      <Switch>
        <Route path="/allocate/company" component={AllocateCompany} />
        <Route path="/allocate/itaa" component={AllocateITAA} />
        <Route path="/usercontrol/ita" component={ITA} />
        <Route path="/usercontrol/itaa" component={ITAA} />
        <Route path="/usercontrol/itpc" component={ITPC} />
        <Route path="/usercontrol/student" component={Student} />
        {/* <Route path="/usercontrol/itpc/:id" component={Edititpc} /> */}
        <Route path="/company/edit/:id" component={Editcompany} />
        <Route path="/company/addcompany" component={Addcompany} />
        <Route path="/company/viewcompany" component={Viewcompany} />
        <Route path="/studentprofile" component={Studentprofile} />
        <Route path="/report" component={Report} />
        <Route path="/admin" component={Home} />
        <Route path="/" component={SignIn} />
      </Switch>
    </div>
  );
};
export default App;
