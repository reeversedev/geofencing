import React, { Component } from "react";
import Header from "./Header";
import ReactMapboxGl, {
  Layer,
  Feature,
  GeoJSONLayer,
  Marker
} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import { app_code, app_id } from "../config/constants";
const _ = require("lodash");
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import info from "../config/info";
import Autosuggestion from "./Autosuggestion";
import axios from "axios";
import styled from "styled-components";
import RadiusMode from "./RadiusMode";

import mapboxgl from "mapbox-gl";

// const Map = ReactMapboxGl({
//   accessToken: info.mapBoxAccessToken
// });

const Mark = styled.div`
  background-color: #e74c3c;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 4px solid #eaa29b;
`;

const renderMap = center => {
  const mapDiv = document.getElementById("map");
  mapDiv.innerHTML = "";
  mapDiv.style.position = "relative";
  // mapDiv.style.top = "32px";
  // mapDiv.style.right = 0;
  mapDiv.style.width = "400px";
  mapDiv.style.height = "400px";
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
    maxRadius: 500000,
    debugEl: document.body.appendChild(document.createElement("div"))
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

  // window.editableCircle0 = new MapboxCircle(center, 350, editableOpts).addTo(
  //   map
  // );

  // window.plainCircle0 = new MapboxCircle(center, 250, nonEditableOpts).addTo(
  //   map
  // );

  // window.plainCircle1 = new MapboxCircle(center, 300, nonEditableOpts).addTo(
  //   map
  // );

  // window.editableCircle1 = new MapboxCircle(center, 300, editableOpts)
  //   .addTo(map)
  //   .setCenter(center)
  //   .setRadius(50);

  window.editableCircle2 = new MapboxCircle(
    center,
    500,
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
    // .on("click", function(mouseEvent) {
    //   // eslint-disable-next-line
    //   console.log("editableCircle2/click", mouseEvent);
    // })
    // .on("contextmenu", function(mouseEvent) {
    //   // eslint-disable-next-line
    //   console.log("editableCircle2/contextmenu", mouseEvent);
    // })

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
      selected: undefined
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
    console.log("value", value);
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
    renderMap(center);
  };
  componentDidMount = () => {
    const center = { lat: this.state.lat, lng: this.state.lon };
    renderMap(center);
  };
  render() {
    return (
      <div>
        <div id="mapContainer" />
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Create a Fence</h2>
          <Autosuggestion
            searchLocation={this.locationSearch}
            place={this.state.searchData}
            goToLocation={this.goToLocation}
          />
          <div style={{ position: "relative",width:'400px',height:'400px' }}>
            <div id="map" />
            <div id="menu" />
          </div>
        </div>

        {/* <Map
          style="mapbox://styles/mapbox/outdoors-v9" // eslint-disable-line
          containerStyle={{ height: "400px", width: "400px" }}
          center={[this.state.lon, this.state.lat]}
          zoom={[15]}
        >
          <DrawControl
            position="top-right"
            onDrawCreate={this.onDrawCreate}
            onDrawUpdate={this.onDrawUpdate}
          />
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature coordinates={[this.state.lon, this.state.lat]} />
          </Layer>
          <Marker
            coordinates={[this.state.lon, this.state.lat]}
            anchor="bottom"
          >
           
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiDY6oI0F7lvDN_EXW26O-QjjXqM-TRehsrDdijsd-YBBOfAWR"
              }
              height="15"
              width="15"
            />
          </Marker>
        </Map> */}
        {/* <Map /> */}
      </div>
    );
  }
}
export default ChooseFence;
