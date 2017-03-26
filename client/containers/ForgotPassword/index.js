/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {
    FormControl,
    ControlLabel,
    FormGroup,
    Button
} from 'react-bootstrap';

export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            message: '',
            email: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value, key) {
        var state = {};
        state[key] = value;
        this.setState(state);
    }

    renderMessage() {
        if (this.state.message.length > 0) {
            return (
                <div className={'alert alert-' + this.state.type} role="alert">{this.state.message}</div>
            );
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.refs.email.isValidEmail()) {
            // send email to reset password
        }
    }

    render() {
        
        return (
            <div className="formForgot">
                <Helmet title="Forgot password"/>
                <form id="forgotForm" name="forgotForm" onSubmit={this.onSubmit}>
                    <FormGroup controlId="formEmail">
                        <ControlLabel>Email address</ControlLabel>
                        <FormControl
                            type="email"
                            name="email"
                            value={this.state.email || ""}
                            placeholder="Your email"
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    { this.renderMessage() }
                    <br/>
                    <Button type="submit" className="forgot-button btn btn-primary">Send me instructions</Button>
                </form>
            </div>
        );
    }
}