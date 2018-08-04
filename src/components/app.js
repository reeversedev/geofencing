import React, { Component } from "react";
import ChooseFence from "./ChooseFence";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "../config/Routes";
import Login from "./Login";
import Maps from "./Maps";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path={Routes.login} component={Login} />
            <Route exact path={Routes.choosefence} component={ChooseFence} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default hot(module)(App);