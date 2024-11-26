import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Autocomplete } from "@react-google-maps/api";
import Sidebar from "./Sidebar";
import { getGeneratedText } from "./ChatGPT";
import SplashScreen from "./Splash";

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
    this.setState({ mapMounted: true });
    this.setState({ showSplash: true });
    this.handleGeolocate();
  }

  handleClick = () => {
    this.setState({ fadeOut: true });
    this.setState({ showSplash: false });
  };

  handleGeolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newMarker = {
            lat: lat,
            lng: lng,
          };
          this.setState({
            markers: [newMarker],
            lat: lat,
            lng: lng,
            isMarkerClicked: true,
            selectedPlace: {},
          });
          this.getAddressFromLatLong(lat, lng);
        },
        () => {
          alert("Could not get your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  onMapClick = (mapProps, map, clickEvent) => {
    const newMarker = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    };
    this.setState({
      markers: [newMarker],
      lat: newMarker.lat,
      lng: newMarker.lng,
      isMarkerClicked: true,
      selectedPlace: {},
    });

    this.getAddressFromLatLong(newMarker.lat, newMarker.lng);
  };

  onMarkerClick = (index) => {
    const marker = this.state.markers[index];
    this.setState({
      activeMarker: marker,
      selectedPlace: { props: { index } },
    });
    this.deleteMarker();
  };

  deleteMarker = () => {
    const markers = [...this.state.markers];
    const index = markers.findIndex(
      (marker) => marker === this.state.activeMarker
    );
    if (index !== -1) {
      markers.splice(index, 1);
      this.setState({
        markers: markers,
        activeMarker: null,
      });
    }
  };

  handleGenerateText = async () => {
    const { address } = this.state;
    const response = await getGeneratedText(address);
    this.setState({ generatedText: response });
  };

  getAddressFromLatLong = async (lat, lng) => {
    const apiKey = process.env.REACT_APP_GMAP_KEY;
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
      const { lat, lng } = place.geometry.location;
      const newMarker = {
        lat: lat(),
        lng: lng(),
      };
      const address = place.formatted_address;

      const map = this.mapRef.current.map;
      new this.props.google.maps.Marker({
        map,
        position: newMarker,
      });
      map.setCenter(newMarker);
      map.setZoom(13);

      this.setState({
        markers: [newMarker],
        lat: newMarker.lat,
        lng: newMarker.lng,
        address,
        place,
        selectedPlace: { props: { index: 0 } },
        isMarkerClicked: true,
      });
    } else {
      console.error("Autocomplete returned null.");
    }
  };

  render() {
    const { google } = this.props;
    const { markers, mapMounted, lat, lng, address, showSplash, fadeOut } =
      this.state;

    if (showSplash) {
      return (
        <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
          <SplashScreen handleClick={this.handleClick} />
        </div>
      );
    }

    if (!mapMounted) {
      return "Loading...";
    }

    return (
      <div className="map-wrapper">
        <Map
          google={google}
          zoom={4}
          initialCenter={{ lat: 39.0902, lng: -115.7129 }}
          mapContainerClassName="map-container"
          onClick={this.onMapClick}
          ref={this.mapRef}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => this.onMarkerClick(index)}
              index={index}
            ></Marker>
          ))}

          <Autocomplete
            onLoad={(autocomplete) => (this.autocomplete = autocomplete)}
            onPlaceChanged={() => this.onPlaceChanged(this.autocomplete)}
          >
            <input
              type="text"
              placeholder="Enter an address or click on the map"
              className="search-input"
            />
          </Autocomplete>
        </Map>

        <Sidebar
          className="sidebar"
          address={address}
          lat={lat}
          lng={lng}
          generatedText={this.state.generatedText}
          setGeneratedText={(text) => this.setState({ generatedText: text })}
          handleGeolocate={this.handleGeolocate}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAP_KEY,
})(MapContainer);
