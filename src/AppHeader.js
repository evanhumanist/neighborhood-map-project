import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Navbar'
import NavLink from 'react-bootstrap/lib/NavLink'
import FormControl from 'react-bootstrap/lib/FormControl'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Form from 'react-bootstrap/lib/Form'

class AppHeader extends Component {

    render() {
        const { openSearch, searchOpen } = this.props;

        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Row>
                    <Col md={10}>
                        <i className="fas fa-utensils"></i>
                        <Navbar.Brand href="#home">LowManFoo</Navbar.Brand>
                        <Navbar.Text>The Lower Manhattan Food Finder</Navbar.Text>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Col>
                    <Col md={1}>
                        <Navbar.Collapse id="basic-navbar-nav">
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
                    </Col>
                </Row>
            </Navbar>
        );
    }
}

export default AppHeader;
