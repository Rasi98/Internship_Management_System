import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Addcompany from "./components/admin/addCompany";
import Viewcompany from "./components/admin/viewCompany";
import Home from "./components/admin/home";
import Editcompany from "./components/admin/editCompany";
import ITA from "./components/admin/usercontrol/ita";
import ITAA from "./components/admin/usercontrol/itaa";
import ITPC from "./components/admin/usercontrol/itpc";
import HRM from "./components/admin/usercontrol/hrm";
import Student from "./components/admin/usercontrol/student";
import AllocateCompany from "./components/admin/allocateCompany";
import AllocateITAA from "./components/admin/allocateITAA";
import Report from "./components/admin/strategicReport";
import SignIn from "./components/login/login";
import Contactcompany from "./components/admin/contactcompany";
import profileAdmin from "./components/admin/studentProfile";
import Edititpc from "./components/admin/usercontrol/edititpc";
import Edithrm from "./components/admin/usercontrol/edithrm";
import Edititaa from "./components/admin/usercontrol/edititaa";
import EditStudent from "./components/admin/usercontrol/editStudent";
import Editita from "./components/admin/usercontrol/editita";
import StudentHome from "./components/student/home";

//Student components
import Profile from "./components/student/profile.jsx";
import Internship from "./components/student/internship";
import Interview from "./components/student/interview";
import PreviewProfile from "./components/student/Resume/preview";

const App = () => {
  return (
    <Router>
      <div className="Container">
        <Switch>
          <Route path="/preview/:email" component={PreviewProfile} />
          <Route path="/interview" component={Interview} />
          <Route path="/internship" component={Internship} />
          <Route path="/profile" component={Profile} />
          <Route path="/allocate/company" component={AllocateCompany} />
          <Route path="/allocate/itaa" component={AllocateITAA} />
          <Route path="/usercontrol/ita/edit/:id" component={Editita} />
          <Route path="/usercontrol/itaa/edit/:id" component={Edititaa} />
          <Route path="/usercontrol/student/edit/:id" component={EditStudent} />
          <Route path="/usercontrol/hrm/edit/:id" component={Edithrm} />
          <Route path="/usercontrol/itpc/edit/:id" component={Edititpc} />
          <Route path="/usercontrol/ita" component={ITA} />
          <Route path="/usercontrol/itaa" component={ITAA} />
          <Route path="/usercontrol/hrm" component={HRM} />
          <Route path="/usercontrol/itpc" component={ITPC} />
          <Route path="/usercontrol/student" component={Student} />
          <Route path="/company/edit/:id" component={Editcompany} />
          <Route path="/company/addcompany" component={Addcompany} />
          <Route path="/company/contact" component={Contactcompany} />
          <Route path="/company/viewcompany" component={Viewcompany} />
          <Route path="/studentprofile/:email" component={profileAdmin} />
          <Route path="/report" component={Report} />
          <Route path="/admin" component={Home} />
          <Route path="/" component={SignIn} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
