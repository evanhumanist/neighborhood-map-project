import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup'
import Logo from './powered-by-foursquare-grey.png'

class SearchResults extends Component {
    render() {

        return (
            this.props.restaurantsArray.filter((restaurant) => (
                restaurant.title.toUpperCase().includes(this.props.query.toUpperCase())
            )).map((restaurant, index) => (
                <ListGroup key={restaurant.title}>
                    <ListGroup.Item>
                        <p className="restaurant-title"><a href="#" onClick={() => this.props.handleClick(index)}>{restaurant.title}</a></p>
                        {restaurant.isOpen && <p><a href={restaurant.menu}>View the menu</a></p>}
                        {restaurant.isOpen && <p>Price: {restaurant.price}</p>}
                        {restaurant.isOpen && <p>Rating: {restaurant.rating}</p>}
                        {restaurant.isOpen && <img src={Logo} className="image-react"/>}
                    </ListGroup.Item>
                </ListGroup>
            ))
        )
    }
}


export default SearchResults;