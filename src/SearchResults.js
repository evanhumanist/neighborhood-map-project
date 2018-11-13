import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup'



class SearchResults extends Component {
    render() {

        return (
            this.props.restaurantsArray.filter((restaurant) => (
                restaurant.title.toUpperCase().includes(this.props.query.toUpperCase())
            )).map((restaurant) => (
                <ListGroup>
                    <ListGroup.Item action>{restaurant.title}</ListGroup.Item>
                </ListGroup>
            ))
        )
    }
}


export default SearchResults;