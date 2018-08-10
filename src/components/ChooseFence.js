import React, { Component } from "react";
import ReactMapboxGl, {
  Layer,
  Feature,
  GeoJSONLayer,
  Marker
} from "react-mapbox-gl";
const _ = require("lodash");

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import info from "../config/info";
import Autosuggestion from "./Autosuggestion";
import axios from "axios";
import styled from "styled-components";
import { FormItem, Input, Icon, Divider } from "antd";
import { Row, Col, FormGroup, Form, Label } from "reactstrap";


import mapboxgl from "mapbox-gl";

import { Link } from "react-router-dom";
import Routes from "../config/Routes";

const Mark = styled.div`
  background-color: #e74c3c;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 4px solid #eaa29b;
`;

const renderMap = (center, radius) => {
  console.log("radius", radius);
  const mapDiv = document.getElementById("map");
  mapDiv.innerHTML = "";
  mapDiv.style.position = "relative";
  // mapDiv.style.top = "32px";
  // mapDiv.style.right = 0;
  mapDiv.style.width = "400px";
  mapDiv.style.height = "250px";
  // mapDiv.style.left = 0;
  // mapDiv.style.bottom = 0;

  const defaultStyle = "streets";

  const styleMenuDiv = document.getElementById("menu");
  // styleMenuDiv.id = "menu";
  styleMenuDiv.style.position = "absolute";
  styleMenuDiv.style.display = "none";
  styleMenuDiv.style.left = 0;
  styleMenuDiv.style.bottom = 0;
  styleMenuDiv.style.backgroundColor = "rgba(255, 255, 255, 0.5)";

  for (let styleOption of [
    "basic",
    "streets",
    "bright",
    "light",
    "dark",
    "satellite",
    "satellite-streets"
  ]) {
    let inputEl = styleMenuDiv.appendChild(document.createElement("input"));
    inputEl.type = "radio";
    inputEl.name = "styleSwitcher";
    inputEl.id = inputEl.value = styleOption;
    if (styleOption === defaultStyle) {
      inputEl.checked = true;
    }

    inputEl.onclick = function setStyle(clickEvent) {
      map.setStyle("mapbox://styles/mapbox/" + clickEvent.target.id + "-v9");
    };

    let labelEl = styleMenuDiv.appendChild(document.createElement("label"));
    labelEl.for = labelEl.textContent = styleOption;
    labelEl.style.paddingRight = "10px";
  }

  // noinspection SpellCheckingInspection
  mapboxgl.accessToken =
    "pk.eyJ1IjoicnNiYXVtYW5uIiwiYSI6IjdiOWEzZGIyMGNkOGY3NWQ4ZTBhN2Y5ZGU2Mzg2NDY2In0.jycgv7qwF8MMIWt4cT0RaQ";

  // const center = { lat: 39.984, lng: -75.343 };
  const map = new mapboxgl.Map({
    container: mapDiv,
    style: "mapbox://styles/mapbox/" + defaultStyle + "-v9",
    center: [center.lng, center.lat],
    zoom: 14
  });

  window.map = map;

  // const markerElement = document.createElement("div");
  // markerElement.style.backgroundImage = "url(https://placekitten.com/g/50/)";
  // markerElement.style.width = "50px";
  // markerElement.style.height = "50px";
  // markerElement.style.borderRadius = "50%";
  // window.marker1 = new mapboxgl.Marker(markerElement)
  //   .setLngLat([center.lng, center.lat])
  //   .addTo(map);

  // MapboxCircle Setup

  const editableOpts = {
    editable: true,
    strokeColor: "#29AB87",
    strokeWeight: 1,
    strokeOpacity: 0.85,
    fillColor: "#29AB87",
    fillOpacity: 0.2,
    minRadius: 100,
    maxRadius: 500000
    // debugEl: document.body.appendChild(document.createElement("div"))
  };

  const extraPrettyEditableOpts = _.extend(
    { refineStroke: true },
    editableOpts
  );

  const nonEditableOpts = {
    strokeWeight: 0,
    fillColor: "#000000",
    fillOpacity: 0.2
  };

  window.editableCircle2 = new MapboxCircle(
    center,
    radius,
    extraPrettyEditableOpts
  ).addTo(map);
  // window.editableCircle3 = new MapboxCircle(center, 225, editableOpts).addTo(
  //   map
  // );

  // window.plainCircle2 = new MapboxCircle(center, 150, nonEditableOpts).addTo(
  //   map
  // );
  // window.plainCircle3 = new MapboxCircle(center, 200, nonEditableOpts).addTo(
  //   map
  // );

  // window.setTimeout(function() {
  //   window.editableCircle1.remove();
  //   window.editableCircle3.remove();
  //   window.setTimeout(function() {
  //     window.editableCircle1
  //       .addTo(map)
  //       .setCenter(center)
  //       .setRadius(300);
  //     window.editableCircle3.addTo(map);
  //   }, 1250);
  // }, 2500);

  window.editableCircle2
    .on("radiuschanged", function(circleObj) {
      const newRadius = circleObj.getRadius();
      // eslint-disable-next-line
      console.log("editableCircle2/radiuschanged", circleObj.getBounds());
      // window.setTimeout(function() {
      //   if (newRadius === circleObj.getRadius()) {
      //     circleObj.setRadius(newRadius * 1.0);
      //   }
      // }, 100);
    })
    .on("centerchanged", function(circleObj) {
      // eslint-disable-next-line
      console.log("editableCircle2/centerchanged", circleObj.getCenter());
    })
    .on("click", function(mouseEvent) {
      // eslint-disable-next-line
      console.log("editableCircle2/click", mouseEvent);
    })
    .on("contextmenu", function(mouseEvent) {
      // eslint-disable-next-line
      console.log("editableCircle2/contextmenu", mouseEvent);
    });

  // window.editableCircle3
  //   .on("radiuschanged", function(circleObj) {
  //     const newRadius = circleObj.getRadius();
  //     // eslint-disable-next-line
  //     console.log("editableCircle3/radiuschanged", circleObj.getBounds());
  //     window.setTimeout(function() {
  //       if (newRadius === circleObj.getRadius()) {
  //         circleObj.setRadius(newRadius * 1.01);
  //       }
  //     }, 1750);
  //   })
  //   .on("centerchanged", function(circleObj) {
  //     // eslint-disable-next-line
  //     console.log("editableCircle3/centerchanged", circleObj.getCenter());
  //   })
  //   .on("click", function(mouseEvent) {
  //     // eslint-disable-next-line
  //     console.log("editableCircle3/click", mouseEvent);
  //   })
  //   .on("contextmenu", function(mouseEvent) {
  //     // eslint-disable-next-line
  //     console.log("editableCircle3/contextmenu", mouseEvent);
  //   });
};
class ChooseFence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lon: 0,
      value: "",
      searchData: [],
      selected: undefined,
      radius: 500
    };
  }

  onDrawCreate = ({ features }) => {
    console.log(features);
  };

  onDrawUpdate = ({ features }) => {
    console.log({ features });
  };
  locationSearch = async value => {
    let res = await axios.get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        value +
        ".json?access_token=" +
        info.mapBoxAccessToken
    );
    return res.data.features;
  };
  showSuggestions = e => {
    this.setState({
      value: e.target.value
    });
  };
  goToLocation = value => {
    // console.log("value", value);
    this.setState({
      lat: value.center[1],
      lon: value.center[0]
    });
  };
  loadMap = () => {
    mapboxgl.accessToken = info.mapBoxAccessToken;
    const Map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v8",
      center: [this.state.lon, this.state.lat],
      zoom: 9,
      minZoom: 5,
      maxZoom: 15
    });
  };
  componentDidUpdate = () => {
    const center = { lat: this.state.lat, lng: this.state.lon };
    const radius = this.state.radiusValue;
    renderMap(center, radius);
  };
  componentDidMount = () => {
    const center = { lat: this.state.lat, lng: this.state.lon };
    const radius = 500;
    renderMap(center, radius);
  };
  changeRadius = e => {
    if (e.target.value <= 0 || e.target.value === undefined) {
      this.setState({
        radiusValue: 500
      });
    } else {
      this.setState({
        radiusValue: e.target.value
      });
    }
  };
  render() {
    return (
      <div>
        <div id="mapContainer" />
        <div className="App-header">
          <Row>
            <Col>
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <h2>1. Create a Fence</h2>
              <div className="ml-4">
                <Autosuggestion
                  searchLocation={this.locationSearch}
                  place={this.state.searchData}
                  goToLocation={this.goToLocation}
                />
                <input
                  type="number"
                  className="react-autosuggest__input mt-2"
                  placeholder="Enter radius of the area"
                  onChange={this.changeRadius}
                />
              </div>
            </Col>
            <Col>
              <div
                // style={{
                //   position: "relative",
                //   width: "400px",
                //   height: "400px"
                // }}
                className="mt-2"
              >
                <div id="map" />
                <div id="menu" />
              </div>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col>
              <h2>2. Choose Demographics</h2>
              <Form>
                <Row>
                  <Col>
                    <FormGroup tag="fieldset">
                      <legend>Platform</legend>
                      <Label check>
                        <Input type="radio" name="radio1" /> iOS
                      </Label>
                      <Label check className="ml-2">
                        <Input type="radio" name="radio1" /> Android
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup tag="fieldset">
                      <legend>Gender</legend>
                      <Label check>
                        <Input type="radio" name="radio1" /> Male
                      </Label>
                      <Label check className="ml-2">
                        <Input type="radio" name="radio1" /> Female
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup tag="fieldset">
                      <legend>Location</legend>
                      <Input type="text" name="location" />
                    </FormGroup>
                    <Link className="btn btn-primary float-right" to={Routes.content}>Next</Link>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default ChooseFence;
