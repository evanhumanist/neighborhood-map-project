import React, { Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar'
import FormControl from 'react-bootstrap/lib/FormControl'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Form from 'react-bootstrap/lib/Form'

class AppHeader extends Component {

    render() {

        return (
            <Navbar bg="dark" variant="dark" expand="sm">
                <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Search Restaurants..."
                        className="mr-sm-2"
                        value={this.props.query}
                        onChange={(event) => this.props.updateQuery(event.target.value)}
                    />
                </Form>
                <i className="fas fa-utensils"></i>
                <Navbar.Brand>LowManFoo</Navbar.Brand>
                <Navbar.Text>The Lower Manhattan Food Finder</Navbar.Text>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
        );
    }
}

export default AppHeader;
