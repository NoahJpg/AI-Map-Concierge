import { Component } from 'react';
import { Polygon } from 'google-maps-react';
import geoJSONData from '../../geoJSONData.json';


class Neighborhood extends Component {
  render() {
    const coordinates = [
      { lat: 40.7128, lng: -74.0060 },
      { lat: 40.7210, lng: -73.9875 },
      { lat: 40.7230, lng: -73.9963 },
      { lat: 40.7190, lng: -74.0025 },
      { lat: 40.7150, lng: -74.0025 }
    ];

    return (
      <Polygon
        paths={coordinates}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
        fillColor="#0000FF"
        fillOpacity={0.35} />
    );
  }
}

export default Neighborhood;
