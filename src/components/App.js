import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { InfoWindow } from '@react-google-maps/api';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      mapMounted: false,
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
    this.setState({ markers: [...this.state.markers, newMarker] });
  };

  onSearchBoxMounted = (ref) => {
    this.searchBox = ref;
  };

  onPlacesChanged = () => {
    const places = this.searchBox.getPlaces();
    const bounds = new this.props.google.maps.LatLngBounds();

    places.forEach((place) => {
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        this.setState({
          markers: [
            ...this.state.markers,
            {
              lat: lat,
              lng: lng,
            },
          ],
        });

        bounds.extend(place.geometry.location);
      }
    });

    this.mapRef.current.map.fitBounds(bounds);
  };

  render() {
    const { google } = this.props;
    const { markers, mapMounted } = this.state;

    if (!mapMounted) {
      return null;
    }

    return (
      <div>
        <input
          type="text"
          placeholder="Search places"
          ref={this.onSearchBoxMounted}
          style={{ marginTop: '10px', marginBottom: '10px', padding: '5px' }}
        />
        <Map
          id="map"
          google={google}
          style={{ width: '100%', height: 'calc(100% - 50px)' }}
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
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAP_KEY,
})(MapContainer);
