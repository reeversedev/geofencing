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
import axios from "axios";

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
      value: "",
      searchData: []
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

    // let res = await axios.get(
    //   "https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=" +
    //     value +
    //     "&app_id=" +
    //     app_id +
    //     "&app_code=" +
    //     app_code + "&language=en"
    // );
    // .then(resData => {
    //   return resData.Response.View[0].Result;
    //   this.setState({
    //     searchData: resData.Response.View[0].Result
    //   });
    // });
    // console.log(data);
    // return data;
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
        </div>
        <Map
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
            {/* <Feature coordinates={[23.0225, -72.5714]} /> */}
            <GeoJSONLayer data={geoJSON} />
          </Layer>
        </Map>
      </div>
    );
  }
}
export default ChooseFence;
