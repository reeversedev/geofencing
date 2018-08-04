import React, { Component } from "react";
import Header from "./Header";
import Maps from "./Maps";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

class ChooseFence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      gmapsLoaded: false
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  // initMap = () => {
  //   this.setState({
  //     gmapsLoaded: true
  //   });
  // };
  // componentWillMount() {
  //   window.initMap = this.initMap;
  //   const gmapScriptEl = document.createElement(`script`);
  //   gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places&callback=initMap`;
  //   document
  //     .querySelector(`body`)
  //     .insertAdjacentElement(`beforeend`, gmapScriptEl);
  // }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>Please choose fence</h3>
            </div>
          </div>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input"
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          {/* <Maps /> */}
        </div>
      </div>
    );
  }
}
export default ChooseFence;
