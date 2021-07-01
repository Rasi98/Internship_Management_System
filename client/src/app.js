import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//Admin Components
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
import StaffInterview from "./components/admin/staffinterview";


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
          {/*student routes*/}
          <Route path="/student/preview/:email" component={PreviewProfile} />
          <Route path="/student/interview" component={Interview} />
          <Route path="/student/internship" component={Internship} />
          <Route path="/student/profile" component={Profile} />
          {/*admin routes*/}
          <Route path="/admin/interview/staffinterview" component={StaffInterview} />
          <Route path="/admin/allocate/company" component={AllocateCompany} />
          <Route path="/admin/allocate/itaa" component={AllocateITAA} />
          <Route path="/admin/usercontrol/ita/edit/:id" component={Editita} />
          <Route path="/admin/usercontrol/itaa/edit/:id" component={Edititaa} />
          <Route path="/admin/usercontrol/student/edit/:id" component={EditStudent} />
          <Route path="/admin/usercontrol/hrm/edit/:id" component={Edithrm} />
          <Route path="/admin/usercontrol/itpc/edit/:id" component={Edititpc} />
          <Route path="/admin/usercontrol/ita" component={ITA} />
          <Route path="/admin/usercontrol/itaa" component={ITAA} />
          <Route path="/admin/usercontrol/hrm" component={HRM} />
          <Route path="/admin/usercontrol/itpc" component={ITPC} />
          <Route path="/admin/usercontrol/student" component={Student} />
          <Route path="/admin/company/edit/:id" component={Editcompany} />
          <Route path="/admin/company/addcompany" component={Addcompany} />
          <Route path="/admin/company/contact" component={Contactcompany} />
          <Route path="/admin/company/viewcompany" component={Viewcompany} />
          <Route path="/admin/studentprofile/:email" component={profileAdmin} />
          <Route path="/admin/report" component={Report} />
          <Route path="/admin" component={Home} />
          {/*login route*/}
          <Route path="/" component={SignIn} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
