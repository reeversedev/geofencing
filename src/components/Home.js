import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "../config/Routes";
import Login from "./Login";
import ChooseFence from "./ChooseFence";

class Home extends Component {
  render() {
    return (
      <div>
        <form id="msform">
          <ul id="progressbar">
            <li className="active">Login</li>
            <li>Squad Details</li>
            <li>Terms & Conditions</li>
          </ul>
          <Router>
            <Switch>
              <Route exact path={Routes.login} component={Login} />
              <Route exact path={Routes.choosefence} component={ChooseFence} />
            </Switch>
          </Router>
        </form>
      </div>
    );
  }
}
export default Home;
