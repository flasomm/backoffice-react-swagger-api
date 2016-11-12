import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Input} from 'components';
import {isEmpty, isNil} from 'lodash';
import Geosuggest from 'react-bootstrap-geosuggest';
import auth from '../utils/auth';
var config = require('config');
var Recaptcha = require('react-recaptcha');

export default class Signup extends Component {

    constructor(props) {
        super(props);
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
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.isConfirmedPassword = this.isConfirmedPassword.bind(this);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.verifyCaptcha = this.verifyCaptcha.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(value, key) {
        var state = {};
        state[key] = value;
        this.setState(state);
    }

    onSuggestSelect(suggest) {
        if (!isEmpty(suggest)) {
            this.setState({
                city: suggest.label,
                latitude: suggest.location.lat,
                longitude: suggest.location.lng,
                placeId: suggest.placeId
            });
        }
    }

    handlePasswordInput(value) {
        if (!isEmpty(this.state.confirmPassword)) {
            this.refs.confirmPassword.validate(value);
        }
        this.setState({password: value});
    }

    isConfirmedPassword(value) {
        return (value === this.state.password);
    }

    signin(token) {
        fetch('http://' + config.api.host + ':' + config.api.port + '/user?api_key=' + token, {
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
        var canProceed = this.refs.email.isValidEmail()
            && this.refs.password.isValid()
            && this.refs.confirmPassword.isValid()
            && this.refs.username.isValid();

        if (!this.state.recaptcha) {
            this.setState({type: 'warning', message: 'The captcha is not valid'});
        }

        if (this.state.recaptcha && canProceed) {
            auth.login(
                config.api.user,
                config.api.password,
                function (token, res) {
                    if (res.ok && !isNil(token)) {
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
                <div className={'alert alert-' + this.state.type} role="alert">{this.state.message}</div>
            );
        }
    }

    verifyCaptcha() {
        this.setState({recaptcha: true, type: '', message: ''});
    }

    onloadCaptcha() {
    }

    render() {
        const styles = require('./styles.css');
        return (
            <div className="formSignin">
                <Helmet title="Sign Up"/>
                <form id="signupForm" name="signupForm" onSubmit={this.onSubmit}>
                    <div className="form-group has-feedback">
                        <div className="form-group">
                            <label className="radio-inline">
                                <Input
                                    id="formBasicText"
                                    type="radio"
                                    name="gender"
                                    ref="gender"
                                    value="m"
                                    required={true}
                                    onChange={this.handleChange}
                                />Mr
                            </label>
                            <label className="radio-inline">
                                <Input
                                    id="formBasicText"
                                    type="radio"
                                    name="gender"
                                    ref="gender"
                                    value="f"
                                    required={true}
                                    onChange={this.handleChange}
                                />Mme
                            </label>
                        </div>
                        <div className="form-group">
                            <Input
                                id="formBasicText"
                                type="email"
                                name="email"
                                ref="email"
                                className="form-control"
                                value={this.state.email}
                                required={true}
                                placeholder="Email address"
                                maxLength="100"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                id="formBasicText"
                                type="text"
                                name="username"
                                ref="username"
                                className="form-control"
                                value={this.state.username}
                                required={true}
                                placeholder="Username"
                                maxLength="100"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                id="formBasicText"
                                name="password"
                                type="password"
                                ref="password"
                                className="form-control"
                                value={this.state.password}
                                required={true}
                                placeholder="Password"
                                onChange={this.handlePasswordInput}
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                id="formBasicText"
                                type="password"
                                name="confirmPassword"
                                ref="confirmPassword"
                                className="form-control"
                                value={this.state.confirmPassword}
                                placeholder="Confirm password"
                                errorMessage="Passwords do not match"
                                onChange={this.handleChange}
                                validate={this.isConfirmedPassword}
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                id="formBasicText"
                                type="text"
                                name="firstname"
                                ref="firstname"
                                className="form-control"
                                value={this.state.firstname}
                                required={true}
                                placeholder="Firstname"
                                maxLength="100"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                id="formBasicText"
                                type="text"
                                name="lastname"
                                ref="lastname"
                                className="form-control"
                                value={this.state.lastname}
                                required={true}
                                placeholder="Lastname"
                                maxLength="100"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <Geosuggest placeholder="City" required types={['(cities)']} onSuggestSelect={this.onSuggestSelect}/>
                        </div>
                        <Recaptcha
                            sitekey={config.recaptchaId}
                            render="explicit"
                            verifyCallback={this.verifyCaptcha}
                            onloadCallback={this.onloadCaptcha}
                        />
                        { this.renderMessage() }
                        <br/>
                        <button type="submit" className="signup-button btn btn-primary">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}