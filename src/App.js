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
        isOpen: false,
        query: '',
        restaurantsArray: [
            {
                title: 'Cocoron',
                location: {
                    lat: 40.720308,
                    lng: -73.993048
                },
                isOpen: false,
                foursquareID: '',
                menu: '',
                price: '',
                rating: '',
                placeID: 'ChIJEcv_vYhZwokRzaEJ5tBS4ZI'
            },
            {
                title: 'Patacon Pisao',
                location: {
                    lat: 40.720393,
                    lng: -73.9875605
                },
                isOpen: false,
                foursquareID: '',
                menu: '',
                price: '',
                rating: '',
                placeID: 'ChIJK75uQoFZwokRzmLthPu_ZS4'

            },
            {
                title: 'Katz Delicatessen',
                location: {
                    lat: 40.722233,
                    lng: -73.98742899999999
                },
                isOpen: false,
                foursquareID: '',
                menu: '',
                price: '',
                rating: '',
                placeID: 'ChIJCar0f49ZwokR6ozLV-dHNTE'
            },
            {
                title: 'Taïm',
                location: {
                    lat: 40.722148,
                    lng: -73.996065
                },
                isOpen: false,
                foursquareID: '',
                menu: '',
                price: '',
                rating: '',
                placeID: 'ChIJ4Us1t4hZwokRGsBUjumzejE'
            },
            {
                title: 'Il Laboratorio Del Gelato',
                location: {
                    lat: 40.7222387,
                    lng: -73.9870811
                },
                isOpen: false,
                foursquareID: '',
                menu: '',
                price: '',
                rating: '',
                placeID: 'ChIJ6yiuIodZwokRoAGoRh5xSlw'
            },
            {
                title: 'Doughnut Plant',
                location: {
                    lat: 40.71633600000001,
                    lng: -73.98853000000001
                },
                isOpen: false,
                foursquareID: '',
                menu: '',
                price: '',
                rating: '',
                placeID: 'ChIJ2SZLBypawokR5g0jFxaMY10'
            },
        ]
    };

    clickMarker = (index) => {
        let copyRestaurantsArray = JSON.parse(JSON.stringify(this.state.restaurantsArray));
        let queryValue = null;
        copyRestaurantsArray.map((copyRestaurant, copyIndex) => (
            index === copyIndex ? (copyRestaurant.isOpen = true, queryValue = true) : copyRestaurant.isOpen = false
        ));
        this.setState({ restaurantsArray: copyRestaurantsArray});
        this.setState({ isOpen: true});
        if (queryValue === true) {
            this.setState({ searchOpen: true})
        }
    };

    closeMarker = () => {
        let copyRestaurantsArray = JSON.parse(JSON.stringify(this.state.restaurantsArray));
        copyRestaurantsArray.map((copyRestaurant, copyIndex) => (
            copyRestaurant.isOpen = false
        ));
        this.setState({ isOpen: false });
        this.setState({ restaurantsArray: copyRestaurantsArray});
        if (!this.state.query) {
            this.setState({ searchOpen: false})
        }
    };

    updateQuery = (queryValue) => {
        this.setState({ query: queryValue });
        if (queryValue !== '' || this.state.isOpen) {
            this.setState({ searchOpen: true });
        } else {
            this.setState({ searchOpen: false });
        }
    };

    handleClick = (index) => {
        this.clickMarker(index)
    };

    fetchFoursquareInfo = (thisComponent) => {
        let copyRestaurantsArray = JSON.parse(JSON.stringify(this.state.restaurantsArray));
        Promise.all(copyRestaurantsArray.map(copyRestaurant =>
            fetch(`https://api.foursquare.com/v2/venues/search?client_id=XUJFOXF0RUASI42LLX103ES4KT5HAFOBZH3GC3NFUL22SDRH&client_secret=HRDIPNR3YTDXQQYBQJ0S2ERNUKBQHRWMKWHL3D3BB5AUJRNZ&name=${copyRestaurant.title}&v=20180323&ll=${copyRestaurant.location.lat},${copyRestaurant.location.lng}&intent=match`)
                .then(response => {
                    return response.json()
                }).catch(response => {
                    alert('Unable to reach Foursquare API')
                }).then(response => {
                    copyRestaurant.foursquareID = response.response.venues[0].id;
                    return fetch(`https://api.foursquare.com/v2/venues/${copyRestaurant.foursquareID}?client_id=XUJFOXF0RUASI42LLX103ES4KT5HAFOBZH3GC3NFUL22SDRH&client_secret=HRDIPNR3YTDXQQYBQJ0S2ERNUKBQHRWMKWHL3D3BB5AUJRNZ&v=20180323`)
                }).catch(response => {
                    alert('Unable to reach Foursquare API')
                }).then(response => {
                    return response.json()
                }).catch(response => {
                    alert(`Missing value for ${copyRestaurant.title}`)
                }).then(response => {
                    copyRestaurant.menu = response.response.venue.menu.mobileUrl;
                    copyRestaurant.price = response.response.venue.price.message;
                    copyRestaurant.rating = response.response.venue.rating;
                    copyRestaurant.hours = response.response.venue.hours.timeframes;
                }).catch(response => {
                    alert(`Missing value for ${copyRestaurant.title}`)
                })
        )).then(
            thisComponent.setState({ restaurantsArray: copyRestaurantsArray })
        );
    };

    componentDidMount() {
        this.fetchFoursquareInfo(this);
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
                            query={this.state.query}
                            closeMarker={this.closeMarker}
                        />
                    </Col>
                    <Fade in={this.state.searchOpen} mountOnEnter={true} unmountOnExit={true}>
                        <Col dimension="width" className="search-results zero-padding" xs={12} md={3}>
                           <SearchResults
                               restaurantsArray={this.state.restaurantsArray}
                               query={this.state.query}
                               handleClick={this.handleClick}
                           />
                        </Col>
                    </Fade>
                </Row>
            </div>
        );
    }
}

export default App;
