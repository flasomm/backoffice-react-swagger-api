import React, {Component, PropTypes} from 'react';
import {IndexLink} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import Modal from 'react-bootstrap/lib/Modal';
import {Footer} from 'components';
import {Login} from 'containers';
var config = require('config');

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false};
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    render() {
        const styles = require('./index.css');
        return (
            <div>
                <Navbar inverse fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <IndexLink to="/">
                                <span>{config.app.title}</span>
                            </IndexLink>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav navbar pullRight>
                            <NavItem eventKey={1} href="/signup">Get started for free</NavItem>
                            <NavItem eventKey={2} href="#" onClick={this.open}>Login</NavItem>
                            <LinkContainer to="/logout">
                                <NavItem eventKey={3} href="#" className="logout-link">Logout</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    {this.props.children}
                </div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Log In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Login />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}