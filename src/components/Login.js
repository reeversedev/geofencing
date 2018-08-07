import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

import { Link } from "react-router-dom";
import Routes from "../config/Routes";
class Login extends Component {
  render() {
    return (
      <div>
        <fieldset>
          <h2 class="fs-title">Login</h2>
          <h3 class="fs-subtitle">Please add your credentials</h3>
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <Link
            name="next"
            class="next action-button btn"
            to={Routes.choosefence}
          >
            Next
          </Link>
        </fieldset>
      </div>
    );
  }
}
export default Login;
