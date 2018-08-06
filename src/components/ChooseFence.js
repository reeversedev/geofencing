import React, { Component } from "react";
import Header from "./Header";
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
// import Autocomplete from "react-autocomplete";
import { app_code, app_id } from "../config/constants";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import info from "../config/info";
import geoJSON from "../config/geoJSON";
import Autosuggestion from "./Autosuggestion";

const Map = ReactMapboxGl({
  accessToken: info.mapBoxAccessToken
});
const center = [72.49837, 22.99696];

// Here Maps

class ChooseFence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      value: ''
    };
  }

  onDrawCreate = ({ features }) => {
    console.log(features);
  };

  onDrawUpdate = ({ features }) => {
    console.log({ features });
  };
  locationSearch = e => {
    fetch(
      "https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=" +
        e.target.value +
        "&app_id=" +
        app_id +
        "&app_code=" +
        app_code
    )
      .then(res => res.json())
      .then(resData =>
        this.setState({
          lat:
            resData.Response.View[0].Result[0].Location.DisplayPosition
              .Latitude,
          lon:
            resData.Response.View[0].Result[0].Location.DisplayPosition
              .Longitude
        })
      );
  };
  showSuggestions = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    // const inputProps = {
    //   placeholder: "Type a programming language",
    //   value,
    //   onChange: this.onChange
    // };
    return (
      <div>
        <Header />
        <div id="mapContainer" />
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Create a Fence</h2>
          <input
            type="text"
            className="inputbox"
            onChange={this.locationSearch}
          />
          {/* <Autocomplete
            getItemValue={item => item.label}
            items={[{ label: "apple" }, { label: "banana" }, { label: "pear" }]}
            renderItem={(item, isHighlighted) => (
              <div
                // style={{ background: isHighlighted ? "blue" : "blue" }}
                key={item.label}
              >
                {item.label}
              </div>
            )}
            // value="30"
            onChange={this.showSuggestions}
            onSelect={this.showSuggestions}
            inputProps={this.inputProps}
            placeholder="Search here"
          /> */}
          <Autosuggestion />
        </div>
        <Map
          style="mapbox://styles/mapbox/outdoors-v9" // eslint-disable-line
          containerStyle={{ height: "400px", width: "100vw" }}
          center={[this.state.lon, this.state.lat]}
          zoom={[13]}
        >
          <DrawControl
            position="top-left"
            onDrawCreate={this.onDrawCreate}
            onDrawUpdate={this.onDrawUpdate}
          />
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            {/* <Feature coordinates={[23.0225, -72.5714]} /> */}
            <GeoJSONLayer data={geoJSON} />
          </Layer>
        </Map>
      </div>
    );
  }
}
export default ChooseFence;
