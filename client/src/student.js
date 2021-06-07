import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navbarstd from "./components/student/Navbar.jsx";
import Profile from "./components/student/profile.jsx";
import Internship from "./components/student/internship";
import Interview from "./components/student/interview";
import PreviewProfile from "./components/student/Resume/preview";

const Student = () => {
  return (
    <Router>
      <Navbarstd />
      <div className="container">
        <Switch>
          <Route path="/preview/:email" component={PreviewProfile} />
          <Route path="/interview" component={Interview} />
          <Route path="/internship" component={Internship} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
};
export default Student;
