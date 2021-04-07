import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Admin from "./pages/Admin";
import AdminPatients from "./pages/AdminPatients";
import AdminDoctors from "./pages/AdminDoctors";

export default function Routes() {
  return (
    <Router>
      <Route
        render={(props) => (
          <Admin {...props}>
            <Switch>
              <Redirect exact from={'/'} to={'/admin/patients'} />
              <Route path="/admin/patients" component={AdminPatients} />
              <Route path="/admin/doctors" component={AdminDoctors} />
            </Switch>
          </Admin>
        )}
      />
    </Router>
  );
}
