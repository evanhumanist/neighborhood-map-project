/* global google */
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import React, { Component } from 'react';


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 40.718436, lng: -73.9936874 }}
    >
        { props.restaurantsArray.map((restaurant, index) => (
            <Marker
                key={restaurant.location.lat + restaurant.location.lng}
                animation={google.maps.Animation.DROP}
                position={{ lat: restaurant.location.lat, lng: restaurant.location.lng }}
                onClick={() => props.clickMarker(index)}
            >
                {/*{this.state.position && <InfoWindow position={} onCloseClick={props.onToggleOpen}>*/}
                    {/*<span>{restaurant.title}</span>*/}
                {/*</InfoWindow>}*/}
                {restaurant.isOpen && <InfoWindow>
                    <span>{restaurant.title}</span>
                </InfoWindow>}
            </Marker>
        )) }
    </GoogleMap>
));


class MapContainer extends Component {

    render() {

        return (
            <MyMapComponent
                isMarkerShown={this.props.isMarkerShown}
                restaurantsArray={this.props.restaurantsArray}
                clickMarker={this.props.clickMarker}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqAJykEECi6MvfBpyGN7TiwNXCKAu0C4c&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `calc(100vh - 72px)`, width: `calc(100%)` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}


export default MapContainer;