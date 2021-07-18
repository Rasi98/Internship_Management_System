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
import AllocateCompany from "./components/admin/StudentallocatedDetails";
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
import Profileview from './components/student/Resume/profileview.jsx'
import HomeStudent from './components/student/home.jsx'
import Profile from "./components/student/profile.jsx";
import Interview from "./components/student/interview";

//ITA Component
import HomeIta from './components/ita/home.jsx';

//ITAA component
import HomeItaa from './components/itaa/home.jsx';

const App = () => {
  return (
    <Router>
      <div className="Container">
        <Switch>
          {/*ITAA routes*/}
          <Route path="/itaa" component={HomeItaa}/>
          {/*ITA routes*/}
          <Route path="/ita" component={HomeIta}/>
          {/*student routes*/}
          <Route path="/student/preview/" component={Profileview} />
          <Route path="/student/interview" component={Interview} />
          <Route path="/student/profile" component={Profile} />
          <Route path="/student" component={HomeStudent}/>
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
