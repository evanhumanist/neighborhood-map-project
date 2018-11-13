import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Navbar'
import NavLink from 'react-bootstrap/lib/NavLink'
import FormControl from 'react-bootstrap/lib/FormControl'
import Form from 'react-bootstrap/lib/Form'

class AppHeader extends Component {

    render() {
        const { openSearch, searchOpen } = this.props;

        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <i className="fas fa-utensils"></i>
                <Navbar.Brand href="#home">LowManFoo</Navbar.Brand>
                <Navbar.Text>The Lower Manhattan Food Finder</Navbar.Text>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink href="#home">Home</NavLink>
                        <NavLink href="#link">Link</NavLink>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search Restaurants..."
                            className="mr-sm-2"
                            value={this.props.query}
                            onChange={(event) => this.props.updateQuery(event.target.value)}
                        />
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default AppHeader;
