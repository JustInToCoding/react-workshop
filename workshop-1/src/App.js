import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputLocation: '',
      location: null,
      temperature: null
    };

    //this.handleChange = this.handleChange.bind(this);
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
  }

  handleLocationSubmit(event) {
    if(event.key === 'Enter') {
      this.retrieveLocationTemperature(this.state.inputLocation);
    }
  }

  handleChange(event) {
    this.setState({...this.state, inputLocation: event.target.value});
  }

  retrieveLocationTemperature(location) {
    const appid = '0eb26bed4afffd10ad23a2fe93552e0e';

    this.setState({...this.state, location: location});
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appid}`)
      .then(result => {
        return result.json();
      })
      .then(json => {
        let temperature = json.main.temp;
        this.setState({...this.state, temperature: temperature});
      });
  }

  componentDidMount() {
    this.retrieveLocationTemperature('London');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <input type="text" value={this.state.inputLocation} onChange={this.handleChange} onKeyPress={this.handleLocationSubmit} />
        </div>
        <p className="App-intro">
          The temperature in {this.state.location} is: {this.state.temperature}.
        </p>
      </div>
    );
  }
}

export default App;
