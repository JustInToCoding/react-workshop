import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherContainer from './weather/weather-container';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
        <Router>
          <Switch>
            <Route path="/" exact={true} component={WeatherContainer} />
            <Route path="/:location" exact={true} component={WeatherContainer} />
          </Switch>
        </Router>
        
      </div>
    );
  }
}

export default App;
