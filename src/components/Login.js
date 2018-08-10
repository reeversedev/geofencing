import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

import { Link } from "react-router-dom";
import Routes from "../config/Routes";

const FormItem = Form.Item;
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          </FormItem>
          <FormItem>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          </FormItem>
          <FormItem>
            <Checkbox>Remember me</Checkbox>
            <a className="login-form-forgot" href="">
              Forgot password?
            </a>
          </FormItem>
          <FormItem>
            <Link name="next" class="btn btn-primary" to={Routes.choosefence}>
              Login
            </Link>{" "}
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Login;
