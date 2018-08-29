import React, { Component } from 'react';
import Weather from './weather.js';
import LeafletMap from '../map/map';

const APPID = '0eb26bed4afffd10ad23a2fe93552e0e';

class WeatherContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      lat: 51.505,
      lon: -0.09,
      temperature: null
    };

    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.onLeafletLocationSelected = this.onLeafletLocationSelected.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match                                                          // if this.props.match exists
      && this.state.location !== this.props.match.params.location               // And if we aren't currently using this location yet
      && (!prevProps.match                                                      // And if prevProps doesn't exist (yet)...
      || this.props.match.params.location !== prevProps.match.params.location)  // Or prevProps location doesnt match currentProps location
    ) {
      this.retrieveLocationTemperature({location: this.props.match.params.location});
    }
  }

  handleLocationSubmit(location) {
    this.retrieveLocationTemperature({location});
  }

  retrieveLocationTemperature({location, latLng}) {
    let RequestURL = `https://api.openweathermap.org/data/2.5/weather?appid=${APPID}&units=metric`;
    if(latLng) {
      RequestURL += `&lat=${latLng.lat}&lon=${latLng.lng}`;
    } else if (location) {
      RequestURL += `&q=${location}`;
    }
    
    fetch(RequestURL)
      .then(result => {
        return result.json();
      })
      .then(json => {
        if(json.cod === 200) {
          let temperature = json.main.temp;
          let {lat, lon} = json.coord;
          let cityName = json.name;
          this.setState({...this.state, location: cityName, lat, lon, temperature});
          if( this.props.match.params.location !== this.cityName ) { // if cityName is not yet in the URL
            this.props.history.push(cityName);
          }
        } else if (json.cod === 404) {
          // Display place not found message
        }
        
      })
      .catch(console.error);
  }

  componentDidMount() {
    let location = this.props.match.params.location;
    if(location) {
      this.retrieveLocationTemperature({location});
    } else {
      this.retrieveLocationTemperature({location: 'London'}); // Default location
    }
  }

  onLeafletLocationSelected(latLng) {
    this.retrieveLocationTemperature({latLng});
  }

  render() {
    return (
      <div className="weatherContainer">
        <Weather location={this.state.location} temperature={this.state.temperature} onSubmit={this.handleLocationSubmit}>
            <b>Hello World</b>
        </Weather>
        <LeafletMap lat={this.state.lat} lon={this.state.lon} onLocationFound={this.onLeafletLocationSelected}></LeafletMap>
      </div>
    );
  }
}

export default WeatherContainer;
