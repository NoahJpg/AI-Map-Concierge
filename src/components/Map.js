import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { InfoWindow } from '@react-google-maps/api';
import Sidebar from './Sidebar';
import { getGeneratedText } from './ChatGPT';
import SplashScreen from './Splash';

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
      previousMarker: null,
      showInfoWindow: false,
      selectedPlace: { props: {} },
      isMarkerClicked: false,
      generatedText: null,
      place: null,
      showSplash: true,
      fadeOut: false,
    };
    this.mapRef = React.createRef();

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ mapMounted: true})
    this.setState({ showSplash: true });
  }

  handleClick = () => {
    this.setState({ fadeOut: true });
    this.setState({ showSplash: false })
  }

  onMapClick = (mapProps, map, clickEvent) => {
    const newMarker = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    };
    this.setState({ 
      markers: [...this.state.markers, newMarker], 
      lat: newMarker.lat, 
      lng: newMarker.lng,
      isMarkerClicked: true,
      selectedPlace: {}
    });

    this.getAddressFromLatLong(newMarker.lat, newMarker.lng);
  };

  onMarkerClick = (index) => {
    if (this.state.previousMarker) {
      this.state.previousMarker.setMap(null);
    }
    this.setState({
      isMarkerClicked: true,
      selectedPlace: { props: { index } },
    });
  }

  handleGenerateText = async () => {
    const { address } = this.state;
    const response = await getGeneratedText(address);
    this.setState({ generatedText: response });
  }

  getAddressFromLatLong = async (lat, lng) => {
    const apiKey = process.env.REACT_APP_GMAP_KEY
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const address = data.results[0].formatted_address;
        this.setState({ address }, () => {});
      }
    } catch (error) {
      console.error(error);
    }
  };

  onPlaceChanged = (autocomplete) => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const map = this.mapRef.current.map;
        const marker = new this.google.maps.Marker({
          map,
          position: place.geometry.location
        });
        map.setCenter(place.geometry.location);
        this.setState({
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          markers: [{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }],
          place // update the state with the selected place
        });
      } else {
        console.log('Autocomplete returned place with no geometry.');
      }
    } else {
      console.log('Autocomplete returned null.');
    }
  };

  render() {
    const { google } = this.props;
    const { markers, mapMounted, lat, lng, address, showSplash, fadeOut} = this.state;

    if (showSplash) {
      return (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
          <SplashScreen handleClick={this.handleClick} />
        </div>
      )
    }

    if (!mapMounted) {
      return "Loading...";
    }

    return (
      <div className='map-wrapper'>
        <Map
          google={google}
          zoom={5}
          initialCenter={{ lat: 37.0902, lng: -95.7129 }}
          mapContainerClassName="map-container"
          onClick={this.onMapClick}
          ref={this.mapRef}>
            
          {markers.map((marker, index) => (
            <Marker 
              key={index} 
              position={{lat: marker.lat, lng: marker.lng}} 
              onClick={() => this.onMarkerClick(index)}
              index={index}>          
            </Marker>
          ))}
        </Map>

          {this.state.isMarkerClicked && (
          
            <Sidebar
              className="sidebar"
              address={address}
              lat={lat}
              lng={lng}
              generatedText={this.state.generatedText}
              setGeneratedText={(text) => this.setState({ generatedText: text })}
            />
          )}
       </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAP_KEY
})(MapContainer);
