import React, { Component } from "react";
import { Calendar, Divider, Input } from "antd";
import { Row, Col } from "reactstrap";

class Content extends Component {
  onDateChange1 = () => {
    console.log("DateChange1 is called");
  };
  render() {
    const { TextArea } = Input;
    return (
      <div>
        <Row>
          <Col>
            <h2>Offer Title</h2>
            <input
              type="text"
              className="react-autosuggest__input"
              placeholder="Enter title here"
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col>
            <h2>Offer Description</h2>
            <TextArea
              type="text"
              className="react-autosuggest__input"
              placeholder="Enter offer description"
              rows={4}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col>
            <h2>Choose Date Range</h2>
            <Row>
              <Col>
                <p>Date range starts from:</p>
                <div
                  style={{
                    width: 300,
                    border: "1px solid #d9d9d9",
                    borderRadius: 4
                  }}
                >
                  <Calendar
                    fullscreen={false}
                    onPanelChange={this.onDateChange1}
                  />
                </div>
              </Col>
              <Col>
                <p>Date range ends on:</p>
                <div
                  style={{
                    width: 300,
                    border: "1px solid #d9d9d9",
                    borderRadius: 4
                  }}
                >
                  <Calendar
                    fullscreen={false}
                    onPanelChange={this.onDateChange1}
                  />
                </div>
              </Col>
            </Row>
            <Divider />
            <button className="btn btn-primary float-right">Finalize</button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Content;
