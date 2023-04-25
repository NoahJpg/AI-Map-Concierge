import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { InfoWindow } from '@react-google-maps/api';
import WalkScore from "./WalkScore";


class MapContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      mapMounted: false,
      lat: null,
      lng: null,
    };
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ mapMounted: true });
  }

  onMapClick = (mapProps, map, clickEvent) => {
    const newMarker = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    };
    console.log('New marker coordinates: ', "lat:", newMarker.lat, "lng:", newMarker.lng);
    this.setState({ 
      markers: [...this.state.markers, newMarker], 
      lat: newMarker.lat, 
      lng: newMarker.lng 
    });
  };

  render() {
    const { google } = this.props;
    const { markers, mapMounted, lat, lng } = this.state;

    if (!mapMounted) {
      return null;
    }

    return (
      <div>
        <Map
          google={google}
          zoom={10}
          initialCenter={{ lat: 40.7128, lng: -74.0060 }}
          mapContainerClassName="map-container"
          onClick={this.onMapClick}
          ref={this.mapRef}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker}>
            <InfoWindow>
              <div>
                <h3>This is the marker info window</h3>
                <p>you cna add any content you want here</p>
              </div>
            </InfoWindow>  
            </Marker>
          ))}
        </Map>

          {lat && lng && (
            <WalkScore 
              lat={lat}
              lng={lng}
            />
          )}

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDcuIlFK46ovUX1gU8KvqjqYYVPOrHMbRU"
})(MapContainer);
