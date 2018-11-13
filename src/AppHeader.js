import React, { Component } from 'react';
// import Container from 'react-bootstrap/lib/Container';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Navbar'
import NavLink from 'react-bootstrap/lib/NavLink'
import Fade from 'react-bootstrap/lib/Fade'
import MapContainer from './MapContainer'

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
                        <Button variant="secondary" className="fas fa-bars"
                                onClick={() => {
                                    openSearch();
                                    console.log(searchOpen);
                                }}
                                aria-controls="example-collapse-text"
                                aria-expanded={searchOpen}/>
                    </Nav>
                    {/*<Form inline>*/}
                        {/*<FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                        {/*<Button variant="outline-success">Search</Button>*/}
                    {/*</Form>*/}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default AppHeader;
