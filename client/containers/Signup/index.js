/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import Geosuggest from 'react-bootstrap-geosuggest';
import auth from '../utils/auth';
var config = require('config');
var Recaptcha = require('react-recaptcha');
import {
    FormControl,
    FormGroup,
    Button,
    Radio
} from 'react-bootstrap';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.verifyCaptcha = this.verifyCaptcha.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            gender: '',
            type: '',
            message: '',
            email: '',
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            confirmPassword: '',
            city: null,
            longitude: null,
            latitude: null,
            placeId: null,
            recaptcha: false
        };
    }

    handleChange(e) {
        this.state.hasChanged = true;
        this.state.message = "";
        this.renderMessage();
        this.state[e.target.name] = e.target.value;
        this.forceUpdate();
    }

    handlePasswordInput(e) {
        if (this.state.password && e.target.value !== this.state.password) {
            this.setState({type: 'danger', message: 'Passwords must match!'});
        }
        this.state.message = "";
        this.renderMessage();
        this.setState({confirmPassword: e.target.value});
    }

    onSuggestSelect(suggest) {
        if (suggest) {
            this.setState({
                city: suggest.label,
                latitude: suggest.location.lat,
                longitude: suggest.location.lng,
                placeId: suggest.placeId
            });
        }
    }

    signin(token) {
        fetch(`http://${config.api.host}:${config.api.port}/users?api_key=${token}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gender: this.state.gender,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                group: "user",
                location: {
                    place: this.state.city,
                    placeId: this.state.placeId,
                    coords: {
                        "type": "Point",
                        "coordinates": [this.state.longitude, this.state.latitude]
                    }
                }
            })
        }).then(function (res) {
            switch (res.status) {
                case 200:
                    this.setState({type: 'success', message: 'Resgistration successful'});
                    window.location.replace("/signup-success");
                    break;
                case 409:
                    this.setState({type: 'warning', message: 'Duplicate email'});
                    break;
                case 500:
                    this.setState({type: 'error', message: 'Error while registration'});
                    break;
            }
        }.bind(this));
    }

    onSubmit(e) {
        e.preventDefault();
        var canProceed = this.state.email && this.state.password && this.state.confirmPassword && this.state.username;

        if (!this.state.recaptcha) {
            this.setState({type: 'warning', message: 'The captcha is not valid'});
        }

        if (this.state.recaptcha && canProceed) {
            auth.login(
                config.api.user,
                config.api.password,
                function (token, res) {
                    if (res.ok && token) {
                        this.setState({type: 'info', message: 'Saving...'});
                        this.signin(token);
                    }
                }.bind(this),
                false
            );
        }
    }

    renderMessage() {
        if (this.state.message.length > 0) {
            return (
                <div className={`alert alert-${this.state.type}`} role="alert">{this.state.message}</div>
            );
        }
        return "";
    }

    verifyCaptcha() {
        this.setState({recaptcha: true, type: '', message: ''});
    }

    onloadCaptcha() {
    }

    render() {
        return (
            <div className="formSignin">
                <Helmet title="Sign Up"/>
                <form id="signupForm" name="signupForm" onSubmit={this.onSubmit}>
                    <div className="form-group has-feedback">
                        <FormGroup controlId="formGender">
                            <Radio inline
                                   name="gender"
                                   value="f"
                                   required
                                   onChange={this.handleChange}
                                   checked={this.state.gender === 'f'}>Female</Radio>
                            <Radio inline
                                   name="gender"
                                   value="m"
                                   required
                                   onChange={this.handleChange}
                                   checked={this.state.gender === 'm'}>Male</Radio>
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="formEmail">
                            <FormControl
                                type="email"
                                name="email"
                                ref="email"
                                title="Email is not valid"
                                value={this.state.email || ""}
                                required={true}
                                placeholder="Email address"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="formUsername">
                            <FormControl
                                type="username"
                                name="username"
                                ref="username"
                                value={this.state.username || ""}
                                required={true}
                                title="Username is not valid"
                                placeholder="Username"
                                maxLength="100"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="formPassword">
                            <FormControl
                                type="password"
                                name="password"
                                ref="password"
                                value={this.state.password || ""}
                                required={true}
                                title="Password is not valid"
                                placeholder="Password"
                                maxLength="100"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="formConfirmPassword">
                            <FormControl
                                type="password"
                                name="confirmPassword"
                                ref="confirmPassword"
                                value={this.state.confirmPassword || ""}
                                required={true}
                                title="Password is not valid"
                                placeholder="Confirm password"
                                maxLength="100"
                                onChange={this.handlePasswordInput}
                            />
                        </FormGroup>
                        <FormGroup controlId="formFirstname">
                            <FormControl
                                type="text"
                                name="firstname"
                                ref="firstname"
                                value={this.state.firstname || ""}
                                required={true}
                                title="Firstname is not valid"
                                placeholder="Firstname"
                                maxLength="100"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="formLastname">
                            <FormControl
                                type="text"
                                name="lastname"
                                ref="lastname"
                                value={this.state.lastname || ""}
                                required={true}
                                title="Lastname is not valid"
                                placeholder="Lastname"
                                maxLength="100"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <div className="form-group">
                            <Geosuggest placeholder="City" required types={['(cities)']} onSuggestSelect={this.onSuggestSelect}/>
                        </div>
                        <Recaptcha
                            sitekey={config.recaptchaId}
                            render="explicit"
                            verifyCallback={this.verifyCaptcha}
                            onloadCallback={this.onloadCaptcha}/>

                        { this.renderMessage() }
                        <br/>

                        <Button type="submit" className="signup-button btn btn-primary">
                            {this.state.isSaving ? 'Saving...' : 'Create Account'}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}