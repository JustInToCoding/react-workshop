import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherContainer from './weather/weather-container';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <WeatherContainer></WeatherContainer>
      </div>
    );
  }
}

export default App;
