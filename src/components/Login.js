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
import Header from "./Header";

class Login extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container>
          <Row className="mt-4">
            <Col sm="6">
              <h2>Administration</h2>
            </Col>
            <Col sm="6">
              <div>
                <h2>Login</h2>
                <Form>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2}>
                      Email
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="abc@email.com"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="examplePassword" sm={2}>
                      Password
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="***********"
                      />
                      <a>Forget Password?</a>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm={10}>
                    </Col>
                    <Col sm={2}>
                        <button className="btn btn-primary">Login</button>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Login;
