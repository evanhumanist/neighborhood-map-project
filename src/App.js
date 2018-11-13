import React, { Component } from 'react';
import AppHeader from './AppHeader'
import './App.css';
import Col from "react-bootstrap/lib/Col";
import MapContainer from "./MapContainer";
import Fade from "react-bootstrap/lib/Fade";
import Row from "react-bootstrap/lib/Row";
import SearchResults from "./SearchResults"

class App extends Component {
    state = {
        searchOpen: false,
        isMarkerShown: true,
        query: '',
        restaurantsArray: [
            {
                title: 'Cocoron',
                location: {
                    lat: 40.720308,
                    lng: -73.993048
                },
                isOpen: false
            },
            {
                title: 'Patacon Pisao',
                location: {
                    lat: 40.720393,
                    lng: -73.9875605
                },
                isOpen: false
            },
            {
                title: 'Katz Delicatessen',
                location: {
                    lat: 40.722233,
                    lng: -73.98742899999999
                },
                isOpen: true
            },
            {
                title: 'Taim',
                location: {
                    lat: 40.722148,
                    lng: -73.996065
                },
                isOpen: false
            },
            {
                title: 'Il Laboratorio Del Gelato',
                location: {
                    lat: 40.7222387,
                    lng: -73.9870811
                },
                isOpen: false
            },
        ]
    };

    clickMarker = (index) => {
        let copyRestaurantsArray = JSON.parse(JSON.stringify(this.state.restaurantsArray));
        copyRestaurantsArray.map((copyRestaurant, copyIndex) => (
            index === copyIndex ? copyRestaurant.isOpen = true : copyRestaurant.isOpen = false
        ));
        this.setState({ restaurantsArray: copyRestaurantsArray})
    };

    updateQuery = (queryValue) => {
        this.setState({ query: queryValue });
        if (queryValue !== '') {
            this.setState({ searchOpen: true });
        } else {
            this.setState({ searchOpen: false });
        }
    };

    render() {

        return (
            <div className="App">
                <Row className="header-bar zero-margin">
                    <Col className="zero-padding">
                        <AppHeader
                            openSearch={this.openSearch}
                            searchOpen={this.state.searchOpen}
                            updateQuery={this.updateQuery}
                            query={this.state.query}
                        />
                        <MapContainer
                            isMarkerShown={this.state.isMarkerShown}
                            restaurantsArray={this.state.restaurantsArray}
                            clickMarker={this.clickMarker}
                        />
                    </Col>
                    <Fade in={this.state.searchOpen} mountOnEnter={true} unmountOnExit={true}>
                        <Col dimension="width" className="search-results zero-padding" xs={3}>
                           <SearchResults
                               restaurantsArray={this.state.restaurantsArray}
                               query={this.state.query}
                           />
                        </Col>
                    </Fade>
                </Row>

            </div>
        );
    }
}

export default App;
