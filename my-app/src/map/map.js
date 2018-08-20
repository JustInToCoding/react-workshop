import React, { Component, createRef } from 'react';

import './map.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class LeafletMap extends Component {

    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
        hasLocation: false
    };

    mapRef = createRef();

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.mapRef.current.leafletElement.locate();
  }

  handleLocationFound = e => {
      console.log(e);
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    })
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
        <div className="map">
        <Map 
            center={position} 
            zoom={this.state.zoom} 
            style={{ height: '300px' }}
            onClick={this.handleClick}
            onLocationfound={this.handleLocationFound}
            ref={this.mapRef}>
            <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </Map>
        </div>
    );
  }

}

export default LeafletMap;
