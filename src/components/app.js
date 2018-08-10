import React, { Component } from "react";
import ChooseFence from "./ChooseFence";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "../config/Routes";
import Login from "./Login";
import Maps from "./Maps";
import Home from "./Home";
import Circle from "./Circle";
import Demographics from "./Demographics";
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path={Routes.home} component={Home} />
            <Route exact path={Routes.login} component={Home} />
            <Route exact path={Routes.choosefence} component={Home} />
            <Route exact path={Routes.content} component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default hot(module)(App);
