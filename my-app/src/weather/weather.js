import React, { Component } from 'react';

class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputLocation: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
  }

  handleLocationSubmit(event) {
    if(event.key === 'Enter') {
      this.props.onSubmit(this.state.inputLocation);
    }
  }

  handleChange(event) {
    this.setState({...this.state, inputLocation: event.target.value});
  }

  render() {
    return (
      <div className="Weather">
        <div>
          <input type="text" value={this.state.inputLocation} onChange={this.handleChange} onKeyPress={this.handleLocationSubmit} />
        </div>
        <p className="App-intro">
          The temperature in {this.props.location} is: {this.props.temperature}.
        </p>
        {this.props.children}
      </div>
    );
  }
}

export default Weather;
