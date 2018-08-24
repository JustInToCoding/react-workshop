import React, { Component, createRef } from 'react';

import './map.css';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerRetinaIcon from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
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
    console.log(leaflet.Icon.Default.prototype.options);
    this.icon = leaflet.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconRetinaUrl: markerRetinaIcon,
  
      iconSize:     [25, 41], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
      shadowAnchor: [12, 41],  // the same for the shadow
      popupAnchor:  [1, -34], // point from which the popup should open relative to the iconAnchor
      tooltipAnchor: [16, -28]
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
