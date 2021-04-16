import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { getCurrentUser } from "./services/auth";
import { PrivateRoute } from "./routes/PrivateRoute";
import { isAuth } from "./services/auth";

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
            isAuth ? (
              <Admin {...props}>
                <Redirect from={"/admin"} to={"/admin/patients"} />
                <PrivateRoute
                  path="/admin/patients"
                  component={AdminPatients}
                />
                <PrivateRoute path="/admin/doctors" component={AdminDoctors} />
              </Admin>
            ) : (
              <div>O Admin não está Online, não é mesmo?!</div>
            )
          }
        />

        <Route
          path="/doctor"
          render={(props) =>
            isAuth() ? (
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
          render={(props) => (
            <Patient {...props}>
              <Redirect from="/patient" to={`/patient/${getCurrentUser()}`}/>
              <PrivateRoute
                exact
                path="/patient/:patient_id"
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
