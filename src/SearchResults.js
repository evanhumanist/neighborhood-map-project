import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup'
import Button from 'react-bootstrap/lib/Button'
import Logo from './powered-by-foursquare-grey.png'

class SearchResults extends Component {
    render() {

        return (
            this.props.restaurantsArray.filter((restaurant) => (
                restaurant.title.toUpperCase().includes(this.props.query.toUpperCase())
            )).map((restaurant, index) => (
                <ListGroup key={restaurant.title}>
                    <ListGroup.Item>
                        <p className="restaurant-title"><Button className="btn btn-sm btn-block btn-wrap-text reducefontsize" onClick={() => this.props.handleClick(index)}>{restaurant.title}</Button></p>
                        {restaurant.isOpen && <p><a href={restaurant.menu}>View the menu</a></p>}
                        {restaurant.isOpen && <p>Price: {restaurant.price}</p>}
                        {restaurant.isOpen && <p>Rating: {restaurant.rating}</p>}
                        {restaurant.isOpen && <img src={Logo} className="image-react" alt="Powered by Foursquare"/>}
                    </ListGroup.Item>
                </ListGroup>
            ))
        )
    }
}


export default SearchResults;