/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Footer} from 'components';
import auth from '../utils/auth';
import {
    Form,
    FormControl,
    ControlLabel,
    FormGroup
} from 'react-bootstrap';

/**
 * Login component class.
 */
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {type: '', message: '', email: '', password: ''};
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        this.state[e.target.name] = e.target.value;
        this.forceUpdate();
    }

    onSubmit(e) {
        e.preventDefault();
        let callback = auth.login(
            this.state.email,
            this.state.password,
            function (token, res) {
                switch (res.status) {
                    case 200:
                        this.setState({type: 'success', message: 'Authentication successful'});
                        window.location.replace("/dashboard");
                        break;
                    case 400:
                        this.setState({type: 'danger', message: res.statusText});
                        break;
                    case 404:
                        this.setState({type: 'warning', message: 'Bad credentials'});
                        break;
                }
            }.bind(this),
            true
        );
        this.setState({type: 'info', message: 'Connecting...'}, callback);
    }

    renderMessage() {
        if (this.state.message.length > 0) {
            return (
                <div className={`alert alert-${this.state.type}`} role="alert">{this.state.message}</div>
            );
        }
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="formLogin">
                        <Helmet title="Log In"/>
                        <Form horizontal id="loginForm" name="loginForm" onSubmit={this.onSubmit}>
                            <FormGroup controlId="formEmail">
                                <ControlLabel>Email address</ControlLabel>
                                <FormControl type="email"
                                             name="email"
                                             ref="email"
                                             value={this.state.email || ""}
                                             placeholder="Your email"
                                             maxLength="100"
                                             required
                                             onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup controlId="formPassword">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl type="password"
                                             name="password"
                                             ref="password"
                                             value={this.state.password || ""}
                                             placeholder="Your password"
                                             maxLength="30"
                                             required
                                             onChange={this.handleChange}/>
                            </FormGroup>
                            { this.renderMessage() }
                            <span className="help-block">
                                <a href="/forgot-password" rel="forgot password">Forgot your password</a>
                            </span>
                            <button type="submit" className="btn btn-primary">Log In</button>
                        </Form>
                    </div>
                </div>
                <hr/>
                <Footer/>
            </div>
        );
    }
}