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
import auth from '../utils/auth'
import 'whatwg-fetch';
import dateFormat from 'dateformat';
import {
    FormControl,
    ControlLabel,
    FormGroup,
    Panel,
    Button,
    Radio
} from 'react-bootstrap';

/**
 * Manage all users profiles.
 */
export default class Profiles extends Component {

    /**
     * Default constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {profile: {}, message: "", hasChanged: false, isSaving: false};
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Is invoked immediately before mounting occurs. It is called before render(),
     * therefore setting state in this method will not trigger a re-rendering.
     * Avoid introducing any side-effects or subscriptions in this method.
     */
    componentWillMount() {
        this.loadProfileData((data) => {
            delete data._id;
            this.setState({profile: data});
        });
    }

    /**
     * Fetch profile data.
     * @param cb
     */
    loadProfileData(cb) {
        fetch(`${auth.getServerUrl()}/users/${this.props.params.id}?api_key=${auth.getToken()}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            return res.json().then(function (data) {
                if (res.status === 200) {
                    cb(data);
                }
            });
        });
    }

    /**
     * On submit method, update user.
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();
        let self = this;
        fetch(`${auth.getServerUrl()}/users/${this.props.params.id}?api_key=${auth.getToken()}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.profile)
        }).then(function (res) {
            return res.json().then(function (data) {
                if (res.status === 200) {
                    self.setState({type: 'info', message: `Profile ${data.username} updated with success`});
                }
            });
        });
    }

    /**
     * Abort the changes on User and return to the Users page.
     */
    cancel() {
        window.location.href = `/profiles`;
    }

    /**
     * Bind field name and value to profile in state.
     * @param e
     */
    handleChange(e) {
        this.state.hasChanged = true;
        this.state.profile[e.target.name] = e.target.value;
        this.forceUpdate();
    }

    /**
     * Display page title according to user id.
     * @returns {*}
     */
    displayPageTitle() {
        if (this.props.params.id === auth.getUserId()) {
            return "Your Profile";
        }

        return `Profile: ${this.state.profile.firstname} ${this.state.profile.lastname}`;
    }

    /**
     * Render message.
     * @returns {XML}
     */
    renderMessage() {
        if (this.state.message.length > 0) {
            return (
                <div className={'alert alert-' + this.state.type} role="alert">{this.state.message}</div>
            );
        }
    }

    /**
     * Render methods.
     * @returns {XML}
     */
    render() {
        const styles = require('./styles.css');
        return (
            <div className="container">
                <Helmet title={this.displayPageTitle()}/>
                <div className="page-header">
                    <h1>{this.displayPageTitle()}</h1>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Panel header={`Created At: ${dateFormat(this.state.profile.createdAt, "dd/mm/yyyy, HH:MM:ss")}`}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="formEditProfile">
                                        <form id="editProfileForm" name="loginForm" onSubmit={this.onSubmit}>
                                            <FormGroup controlId="formEmail">
                                                <ControlLabel>Email address</ControlLabel>
                                                <FormControl type="email"
                                                             name="email"
                                                             value={this.state.profile.email || ""}
                                                             placeholder="Your email"
                                                             onChange={this.handleChange}/>
                                                <FormControl.Feedback />
                                            </FormGroup>

                                            <FormGroup controlId="formUsername">
                                                <ControlLabel>Username</ControlLabel>
                                                <FormControl type="text"
                                                             name="username"
                                                             value={this.state.profile.username || ""}
                                                             placeholder="Your username"
                                                             onChange={this.handleChange}/>
                                                <FormControl.Feedback />
                                            </FormGroup>

                                            <FormGroup controlId="formFirstname">
                                                <ControlLabel>Firstname</ControlLabel>
                                                <FormControl type="text"
                                                             name="firstname"
                                                             value={this.state.profile.firstname || ""}
                                                             placeholder="Your firstname"
                                                             onChange={this.handleChange}/>
                                                <FormControl.Feedback />
                                            </FormGroup>

                                            <FormGroup controlId="formLastname">
                                                <ControlLabel>Firstname</ControlLabel>
                                                <FormControl type="text"
                                                             name="lastname"
                                                             value={this.state.profile.lastname || ""}
                                                             placeholder="Your lastname"
                                                             onChange={this.handleChange}/>
                                                <FormControl.Feedback />
                                            </FormGroup>

                                            <FormGroup controlId="formGender">
                                                <ControlLabel>Gender</ControlLabel><br/>
                                                <Radio inline
                                                       name="gender"
                                                       value="f"
                                                       onChange={this.handleChange}
                                                       checked={this.state.profile.gender === 'f'}>Female</Radio>
                                                <Radio inline
                                                       name="gender"
                                                       value="m"
                                                       onChange={this.handleChange}
                                                       checked={this.state.profile.gender === 'm'}>Male</Radio>
                                                <FormControl.Feedback />
                                            </FormGroup>

                                            <FormGroup controlId="formGroup">
                                                <ControlLabel>Group</ControlLabel>
                                                <FormControl componentClass="select"
                                                             placeholder="Group"
                                                             name="group"
                                                             value={this.state.profile.group}
                                                             onChange={this.handleChange}>
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </FormControl>
                                                <FormControl.Feedback />
                                            </FormGroup>

                                            <FormGroup controlId="formActive">
                                                <ControlLabel>Active</ControlLabel>
                                                <FormControl componentClass="select"
                                                             placeholder="Active"
                                                             name="active"
                                                             value={this.state.profile.active}
                                                             onChange={this.handleChange}>

                                                    <option value={true}>Yes</option>
                                                    <option value={false}>No</option>
                                                </FormControl>
                                                <FormControl.Feedback />
                                            </FormGroup>

                                            { this.renderMessage() }

                                            <div className="validation-btn">
                                                <Button type="button"
                                                        className="btn btn-default"
                                                        disabled={this.state.isSaving}
                                                        onClick={this.cancel.bind(this)}>
                                                    Cancel
                                                </Button>

                                                <Button type="submit"
                                                        className="btn btn-primary"
                                                        disabled={!this.state.hasChanged || this.state.isSaving}>
                                                    {this.state.isSaving ? 'Saving...' : 'Save'}
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }


}