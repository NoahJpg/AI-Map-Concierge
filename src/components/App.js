import '../App.css';
import { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, PlacesService, geoJSON} from 'google-maps-react';
import nycNeighborhoodData from '../data/nycNeighborhoodData.json';


class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: [],
      mapMounted: false,
    };
  }

  onMapClick = (mapProps, map, clickEvent) => {
    const newMarker = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    };
    this.setState({ markers: [...this.state.markers, newMarker] });
  };

  componentDidMount() {
    this.setState({ mapMounted: true });
    const { google } = this.props;
    const service = new google.maps.places.PlacesService(this.map);
    const request = {
      location : { lat: 40.7128, lng: -74.0060 },
      radius: 5000,
      type: ['restaurant']
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
      }
    });
  }

  render() {
    const { google } = this.props;
    const { markers, mapMounted } = this.state;

    if (!mapMounted) {
      return null;
    }

    return (
      <Map
        ref={(map) => this.map = map}
        id="map"
        google = {google}
        style={{ width:"100%", height:"100%" }}
        zoom = {10}
        initialCenter= {{ lat: 40.7128, lng: -74.0060 }}
        mapContainerClassName="map-container"
        onClick={this.onMapClick}
      >
        <geoJSON
          data={nycNeighborhoodData}
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