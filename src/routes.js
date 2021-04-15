import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { PrivateRoute } from "./routes/PrivateRoute";

import Admin from "./pages/Admin";
import AdminPatients from "./pages/Admin/AdminPatients";
import AdminDoctors from "./pages/Admin/AdminDoctors";

import Doctor from "./pages/Doctor";
import DoctorContent from "./pages/Doctor/DoctorContent";
import DoctorUpload from "./pages/Doctor/DoctorUpload";

import Patient from "./pages/Patient";
import PatientContent from "./pages/Patient/PatientContent";

import Home from "./pages/Home";
import HomeContent from "./pages/Home/HomeContent";

import Login from "./pages/Login";
import LoginContent from "./pages/Login/LoginContent";

export default function Routes() {
  return (
    <Router>
      <Redirect from="/" to="/login" />
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
              <Redirect from={"/login"} to={"/login/"} />
              <Route exact path="/login/" component={LoginContent} />
            </Login>
          )}
        />
        <Route
          path="/admin"
          render={(props) => (
            <Admin {...props}>
              <Redirect from={"/admin"} to={"/admin/patients"} />
              <PrivateRoute
                exact
                path="/admin/patients"
                component={AdminPatients}
              />
              <PrivateRoute
                exact
                path="/admin/doctors"
                component={AdminDoctors}
              />
            </Admin>
          )}
        />

        <Route
          render={(props) => (
            <Doctor {...props}>
              <PrivateRoute
                exact
                path="/doctor/list/:doctorId"
                component={DoctorContent}
              />
              <PrivateRoute
                exact
                path="/doctor/upload/:doctor_id/:patient_id"
                component={DoctorUpload}
              />
            </Doctor>
          )}
        />

        <Route
          path="/patient"
          render={(props) => (
            <Patient {...props}>
              <Redirect from={"/patient"} to={"/patient/list"} />
              <PrivateRoute
                exact
                path="/patient/list"
                component={PatientContent}
              />
            </Patient>
          )}
        />

        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </Router>
  );
}
