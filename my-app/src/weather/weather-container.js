import React, { Component } from 'react';
import Weather from './weather.js';
import LeafletMap from '../map/map';

class WeatherContainer extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      location: null,
      temperature: null
    };

    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
  }

  handleLocationSubmit(location) {
    this.retrieveLocationTemperature(location);
  }

  retrieveLocationTemperature(location) {
    const appid = '0eb26bed4afffd10ad23a2fe93552e0e';

    this.setState({...this.state, location: location});
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appid}`)
      .then(result => {
        return result.json();
      })
      .then(json => {
        if(json.cod === 200) {
          let temperature = json.main.temp;
          this.setState({...this.state, temperature: temperature});
        } else if (json.cod === 404) {
          // Display place not found message
        }
        
      })
      .catch(console.error);
  }

  componentDidMount() {
    this.retrieveLocationTemperature('London');
  }

  render() {
    return (
      <div className="weatherContainer">
        <Weather location={this.state.location} temperature={this.state.temperature} onSubmit={this.handleLocationSubmit}>
            <b>Hello World</b>
        </Weather>
        <LeafletMap></LeafletMap>
      </div>
    );
  }
}

export default WeatherContainer;
