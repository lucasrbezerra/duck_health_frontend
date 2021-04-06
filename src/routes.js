import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Patient from "./pages/Patient";
import Doctor from "./pages/Doctor";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/patients" component={Patient} />
        <Route path="/doctors" component={Doctor} />
      </Switch>
    </Router>
  );
}
