import Autosuggest from "react-autosuggest";
import React, { Component } from "react";
import "regenerator-runtime/runtime";

class Autosuggestion extends React.Component {
  constructor(props) {
    super(props);
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: "",
      suggestions: []
    };
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = async value => {
    let data = await this.props.searchLocation(value);
    return data;

    // return inputLength === 0
    //   ? []
    //   : this.props.place.filter(
    //       lang => lang.Location.label.toLowerCase().slice(0, inputLength) === inputValue
    //     );
    // return this.props.place;
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => {
    // console.log(suggestion);
    this.props.goToLocation(suggestion);
    return suggestion.Location.Address.Label;
  };

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => {
    // console.log(suggestion);
    return <div>{suggestion.Location.Address.Label}</div>;
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type a programming language",
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
export default Autosuggestion;
