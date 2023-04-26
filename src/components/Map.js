import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { InfoWindow } from '@react-google-maps/api';
import WalkScore from "./WalkScore";
import Sidebar from './Sidebar';
import { getGeneratedText } from './ChatGPT';


class MapContainer extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      mapMounted: false,
      lat: null,
      lng: null,
      address: null,
      activeMarker: null,
      showInfoWindow: false,
      selectedPlace: { props: {} },
      isMarkerClicked: false,
      generatedText: null
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

    this.getAddressFromLatLong(newMarker.lat, newMarker.lng);
  };

  onMarkerClick = (index) => {
    console.log("Marker Clicked: ", index);
    this.setState({
      isMarkerClicked: true,
      selectedPlace: { props: { index } }
    });
  }

  getAddressFromLatLong = async (lat, lng) => {
    const apiKey = process.env.REACT_APP_GMAP_KEY
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      const address = data.results[0].formatted_address;
      this.setState({ address }, () => {
        console.log("Address:", address)
      });
    }
  } catch (error) {
    console.error(error);
  }
};

  render() {
    const { google } = this.props;
    const { markers, mapMounted, lat, lng, address } = this.state;

    if (!mapMounted) {
      return null;
    }

  const encodedAddress = encodeURIComponent(address);
  console.log("encoded address:", encodedAddress)

    return (
      <div className='map-wrapper'>
        <Map
          google={google}
          zoom={10}
          initialCenter={{ lat: 40.7128, lng: -74.0060 }}
          mapContainerClassName="map-container"
          onClick={this.onMapClick}
          ref={this.mapRef}
        >
          {markers.map((marker, index) => (
            <Marker 
              key={index} 
              position={{lat: marker.lat, lng: marker.lng}} 
              onClick={() => this.onMarkerClick(index)}
              index={index}>
              {this.state.showInfoWindow &&
                this.state.selectedPlace.props && 
                this.state.selectedPlace.props.index === index && (
                <InfoWindow onCloseClick={this.onCloseInfoWindow}>
                  <div>
                    <h3>This is the marker info window</h3>
                    <p>you can add any content you want here</p>
                  </div>
                </InfoWindow> 
              )}             
            </Marker>
          ))}
        </Map>

          {lat && lng && (
            <WalkScore 
              lat={lat}
              lng={lng}
              address={encodedAddress}
            />
          )}
          
          {this.state.isMarkerClicked && (
          
            <Sidebar
              className="sidebar"
              address={address}
              lat={lat}
              lng={lng}
              getGeneratedText={this.generatedText}
              generatedText={this.state.generatedText}
            />
          )}
       </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAP_KEY
})(MapContainer);
