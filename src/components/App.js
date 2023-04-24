import '../App.css';
import { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import geoJSONData from '../data/geoJSONData.json';

class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: []
    };
  }

  onMapClick = (mapProps, map, clickEvent) => {
    const newMarker = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    };
    this.setState({ markers: [...this.state.markers, newMarker] });
  };

  render() {
    const { google } = this.props;
    const { markers } = this.state;

    return (
      <Map
        google = {google}
        style={{ width:"100%", height:"100%" }}
        zoom = {10}
        initialCenter= {{ lat: 40, lng: -80 }}
        mapContainerClassName="map-container"
        onClick={this.onMapClick}
      >
        <geoJSON
          data={geoJSONData}
          fillColor="#FF0000"
          strokeColor="#000000"
        />
      {markers.map((marker, index) => (
         <Marker 
         key={index}
         position={marker} 
         />
      ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAP_KEY
})(MapContainer)