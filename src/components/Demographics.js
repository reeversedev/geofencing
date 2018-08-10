import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

class Demographics extends Component {
  render() {
    return (
      <div>
        <Form>
          <FormGroup tag="fieldset">
            <legend>Platform</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" /> iOS
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" /> Android
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Gender</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" /> Male
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" /> Female
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Location</legend>
            <FormGroup check>
              <Input type="text" name="location" />
            </FormGroup>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
export default Demographics;
