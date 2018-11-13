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
        searchOpen: false
    };

    openSearch = () => {
        this.setState({ searchOpen: !this.state.searchOpen });
    }

    render() {

        return (
            <div className="App">
                <Row className="header-bar zero-margin">
                    <Col className="zero-padding">
                        <AppHeader
                            openSearch={this.openSearch}
                            searchOpen={this.searchOpen}
                        />
                        <MapContainer />
                    </Col>
                    <Fade in={this.state.searchOpen} mountOnEnter={true} unmountOnExit={true}>
                        <Col dimension="width" className="search-results zero-padding" xs={3}>
                           <SearchResults />
                        </Col>
                    </Fade>
                </Row>

            </div>
        );
    }
}

export default App;
