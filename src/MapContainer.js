/* global google */
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup'

let styles = [
    {
        featureType: 'poi.business',
        stylers: [{visibility: 'off'}]
    },
    {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}]
    }
];

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 40.718436, lng: -73.9936874 }}
        defaultOptions={{ styles: styles }}
    >
        { props.restaurantsArray.filter((restaurant) => (
                props.query ? restaurant.title.toUpperCase().includes(props.query.toUpperCase()) : true
            )).map((restaurant, index) => (
            <Marker
                key={restaurant.location.lat + restaurant.location.lng}
                animation={google.maps.Animation.DROP}
                position={{ lat: restaurant.location.lat, lng: restaurant.location.lng }}
                onClick={() => props.clickMarker(index)}
            >
                {restaurant.isOpen && <InfoWindow onCloseClick={props.closeMarker}>
                    <div>
                        <p className="restaurant-title">{restaurant.title}</p>
                        <ListGroup variant="flush">
                        {restaurant.hours && restaurant.hours.map((hour) => (
                            <ListGroup.Item key={restaurant.location.lat + restaurant.location.lng + hour.days}>{hour.days} {hour.open[0].renderedTime}</ListGroup.Item>
                        )) }
                        </ListGroup>
                        {/*<span>{restaurant.foursquareID}</span>*/}
                        {/*<span>{restaurant.menu}</span>*/}
                        {/*<span>{restaurant.price}</span>*/}
                        {/*<span>{restaurant.rating}</span>*/}
                    </div>
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
                query={this.props.query}
                closeMarker={this.props.closeMarker}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqAJykEECi6MvfBpyGN7TiwNXCKAu0C4c&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `calc(100vh - 72px)`, width: `calc(100%)` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}


export default MapContainer;