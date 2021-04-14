import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Admin from "./pages/Admin";
import AdminPatients from "./pages/Admin/AdminPatients";
import AdminDoctors from "./pages/Admin/AdminDoctors";
import Doctor from "./pages/Doctor";
import DoctorContent from "./pages/Doctor/DoctorContent";
import Patient from "./pages/Patient";
import PatientContent from "./pages/Patient/PatientContent";
import Home from "./pages/Home";
import HomeContent from "./pages/Home/HomeContent";
import Login from "./pages/Login";
import LoginContent from "./pages/Login/LoginContent";

export default function Routes() {
  return (
    <Router>
      <Redirect from="/" to="/home" />
      <Switch>
        <Route
          path="/home"
          render={(props) => (
            <Home {...props}>
              <Route exact path="/home" component={HomeContent} />
            </Home>
          )}
        />
        <Route
          path="/login"
          render={(props) => (
            <Login {...props}>
              <Redirect from={"/login"} to={"/login/"}/>
              <Route exact path="/login/" component={LoginContent} />
            </Login>
          )}
        />
        <Route
          path="/admin"
          render={(props) => (
            <Admin {...props}>
              <Redirect from={"/admin"} to={"/admin/patients"} />
              <Route exact path="/admin/patients" component={AdminPatients} />
              <Route exact path="/admin/doctors" component={AdminDoctors} />
            </Admin>
          )}
        />
        <Route
          path="/doctor"
          render={(props) => (
            <Doctor {...props}>
              <Redirect from={"/doctor"} to={"/doctor/list"} />
              <Route exact path="/doctor/list" component={DoctorContent} />
            </Doctor>
          )}
        />

        <Route
          path="/patient"
          render={(props) => (
            <Patient {...props}>
              <Redirect from={"/patient"} to={"/patient/list"} />
              <Route exact path="/patient/list" component={PatientContent} />
            </Patient>
          )}
        />
      </Switch>
    </Router>
  );
}
