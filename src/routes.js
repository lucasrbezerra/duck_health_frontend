import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { PrivateRoute } from "./routes/PrivateRoute";
import { isAuth, getCurrentUser, getCurrentUserClass } from "./services/auth";

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
      <Redirect from="/" to="/home" />
      <Switch>
        <Route
          path="/home"
          render={(props) => (
            <Home {...props}>
              <Route path="/home" component={HomeContent} />
            </Home>
          )}
        />
        <Route
          path="/login"
          render={(props) => (
            <Login {...props}>
              <Redirect from="/login" to="/login/" />
              <Route path="/login/" component={LoginContent} />
            </Login>
          )}
        />
        <Route
          path="/admin"
          render={(props) =>
            isAuth && getCurrentUserClass() === "admin" ? (
              <Admin {...props}>
                <Redirect from={"/admin"} to={"/admin/patients"} />
                <PrivateRoute
                  path="/admin/patients"
                  component={AdminPatients}
                />
                <PrivateRoute path="/admin/doctors" component={AdminDoctors} />
              </Admin>
            ) : (
              <div>O Admin não está Online, não é mesmo Clayson?!</div>
            )
          }
        />

        <Route
          path="/doctor"
          render={(props) =>
            isAuth() && getCurrentUserClass() === "doctor" ? (
              <Doctor {...props}>
                <Redirect
                  from="/doctor"
                  to={`/doctor/list/${getCurrentUser()}`}
                />
                <Route
                  path="/doctor/list/:doctorId"
                  component={DoctorContent}
                />
                <Route
                  path="/doctor/upload/:doctor_id/:patient_id"
                  component={DoctorUpload}
                />
              </Doctor>
            ) : (
              <div>Not Found Doctor Bro</div>
            )
          }
        />

        <Route
          path="/patient"
          render={(props) =>
            isAuth() && getCurrentUserClass() === "patient" ? (
              <Patient {...props}>
                <Redirect from="/patient" to={`/patient/${getCurrentUser()}`} />
                <PrivateRoute
                  exact
                  path="/patient/:patient_id"
                  component={PatientContent}
                />
              </Patient>
            ) : (
              <div>Is not a patient</div>
            )
          }
        />

        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </Router>
  );
}
