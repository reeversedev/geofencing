import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Routes from "../config/Routes";
import Login from "./Login";
import ChooseFence from "./ChooseFence";
import Content from './Content';
import { Steps, Layout, Menu } from "antd";
import { Container, Row, Col } from "reactstrap";

const Step = Steps.Step;
const { Header, Footer } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    const route = this.props.location.pathname;
    return (
      <div>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Container>
            <Steps current={route === "/login" ? 0 : 1} className="mt-4">
              <Step title="Login" description="Enter your credentials" />
              <Step
                title="Demographics"
                description="Choose the demographics"
              />
              <Step title="Content" description="Customise the details" />
            </Steps>
            <div className="mt-4">
              <Router>
                <Switch>
                  <Route exact path={Routes.login} component={Login} />
                  <Route
                    exact
                    path={Routes.choosefence}
                    component={ChooseFence}
                  />
                  <Route
                    exact
                    path={Routes.content}
                    component={Content}
                  />
                </Switch>
              </Router>
            </div>
          </Container>
        </Layout>
      </div>
    );
  }
}
export default Home;
