import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { Component } from 'react';


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 40.718436, lng: -73.9936874 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
));


class MapContainer extends Component {
    render() {

        return (
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqAJykEECi6MvfBpyGN7TiwNXCKAu0C4c&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `calc(100vh - 72px)`, width: `calc(100%)` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}


export default MapContainer;