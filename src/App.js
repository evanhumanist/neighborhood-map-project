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
                isOpen: false,
                foursquareID: '',
                menu: '',
                price: '',
                rating: ''
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
                rating: ''
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
                rating: ''
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
                rating: ''
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
                rating: ''
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

    fetchFoursquareInfo = (thisComponent) => {
        let copyRestaurantsArray = JSON.parse(JSON.stringify(this.state.restaurantsArray));
        Promise.all(copyRestaurantsArray.map(copyRestaurant =>
            fetch(`https://api.foursquare.com/v2/venues/search?client_id=33F5SPUB3QKZRIW02J1Z2QYSX3FGPMDO5UOVGIJHUSR4WIHR&client_secret=K2O5OJ5ZRJWFL3RV00G1QHFJZMHF4XAHGFF534IPBFIKDUJI&name=${copyRestaurant.title}&v=20180323&ll=${copyRestaurant.location.lat},${copyRestaurant.location.lng}&intent=match`)
                .then(response => {
                    return response.json()
                }).then(response => {
                    console.log(response.response.venues[0].id);
                    copyRestaurant.foursquareID = response.response.venues[0].id;
                    return fetch(`https://api.foursquare.com/v2/venues/${copyRestaurant.foursquareID}?client_id=33F5SPUB3QKZRIW02J1Z2QYSX3FGPMDO5UOVGIJHUSR4WIHR&client_secret=K2O5OJ5ZRJWFL3RV00G1QHFJZMHF4XAHGFF534IPBFIKDUJI&v=20180323`)
                }).then(response => {
                    // copyRestaurant.menu = response.response.venues[0].id;
                    return response.json()
                }).catch(response => {
                    console.log(`Missing value for ${copyRestaurant.title}`)
                }).then(response => {
                    console.log(response);
                    copyRestaurant.menu = response.response.venue.menu.mobileUrl;
                    copyRestaurant.price = response.response.venue.price.message;
                    copyRestaurant.rating = response.response.venue.rating;
                }).catch(response => {
                    console.log(`Missing value for ${copyRestaurant.title}`)
                })
        )).then(
            thisComponent.setState({ restaurantsArray: copyRestaurantsArray })
        );

            // ).then(restaurants => {
            //     console.log(restaurants)
            // });
            //     return(response.json())
            // }).then(function(responseJSON) {
            //     copyRestaurant.foursquareID = responseJSON.response.venues[0].id;
            //     console.log(responseJSON.response.venues[0].id);
            //     // return fetch(`https://api.foursquare.com/v2/venues/${copyRestaurant.foursquareID}?client_id=33F5SPUB3QKZRIW02J1Z2QYSX3FGPMDO5UOVGIJHUSR4WIHR&client_secret=K2O5OJ5ZRJWFL3RV00G1QHFJZMHF4XAHGFF534IPBFIKDUJI&v=20180323`)
            // })
            // //     .then(function(response) {
            //     return(response.json())
            // }).then(function(responseJSON) {
            //     // copyRestaurant.foursquareID = responseJSON.response.venues[0].id;
            //     console.log(responseJSON.response);
            //     //     .catch(function(error) {
            //     //     console.log(`warning, no id found for ${copyRestaurant.title}`)
            //     // })
            // })
        // Promise.all(requests)
        //     .then(responses =>
        //         console.log(responses)
        //     )
        //     .then((copyRestaurantsArray) => {
        //     console.log(copyRestaurantsArray);
        //     // this.setState({ restaurantsArray: copyRestaurantsArray });
        //     // return copyRestaurantsArray
        // })
        //
        // console.log('hello')
    };

    componentDidMount() {
        this.fetchFoursquareInfo(this)
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
