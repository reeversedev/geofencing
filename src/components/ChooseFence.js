import React, { Component } from "react";
import Header from "./Header";
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import info from "../config/info";
import geoJSON from "../config/geoJSON";

const Map = ReactMapboxGl({
  accessToken: info.mapBoxAccessToken
});
const center = [72.4997, 22.9960];

class ChooseFence extends Component {
  onDrawCreate = ({ features }) => {
    console.log(features);
  };

  onDrawUpdate = ({ features }) => {
    console.log({ features });
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Create a Fence</h2>
        </div>
        <Map
          style="mapbox://styles/mapbox/outdoors-v9" // eslint-disable-line
          containerStyle={{ height: "400px", width: "100vw" }}
          center={center}
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
