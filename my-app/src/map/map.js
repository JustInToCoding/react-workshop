import React, { Component, createRef } from 'react';

import './map.css';
import 'leaflet/dist/leaflet.css';
import test from 'leaflet/dist/images/marker-icon.png';
import test2 from 'leaflet/dist/images/marker-shadow.png';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import leaflet from 'leaflet';

class LeafletMap extends Component {
  icon;

    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
        hasLocation: false
    };

    mapRef = createRef();

  constructor(props) {
    super(props);
    this.icon = leaflet.icon({
      iconUrl: test,
      shadowUrl: test2,
  
      iconSize:     [21, 41], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [10, 0], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
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
            <Marker icon={this.icon} position={position}>
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
