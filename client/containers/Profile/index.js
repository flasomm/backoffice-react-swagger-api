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
    ButtonGroup,
    Radio
} from 'react-bootstrap';

/**
 * Manage all users profiles.
 */
export default class Profiles extends Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {profile: {}, message: ""};
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     *
     */
    componentWillMount() {
        this.fetchProfileData((data) => {
            this.setState({profile: data});
        });
    }

    /**
     *
     * @param cb
     */
    fetchProfileData(cb) {
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

    handleChange(e) {
        console.log(e.target.name);
        console.log(e.target.value);
        let profile = this.state.profile;
        profile[e.target.name] = e.target.value;
        console.log(profile);
        this.setState({profile: profile});
    }

    /**
     *
     * @returns {*}
     */
    displayPageTitle() {
        if (this.props.params.id === auth.getUserId()) {
            return "Your Profile";
        }

        return `Profile: ${this.state.profile.firstname} ${this.state.profile.lastname}`;
    }

    /**
     *
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
     *
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
                                                <FormControl
                                                    type="email"
                                                    name="email"
                                                    value={this.state.profile.email}
                                                    placeholder="Your email"
                                                    onChange={this.handleChange}
                                                />
                                                <FormControl.Feedback />
                                            </FormGroup>
                                            <FormGroup controlId="formUsername">
                                                <ControlLabel>Username</ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="username"
                                                    value={this.state.profile.username}
                                                    placeholder="Your username"
                                                    onChange={this.handleChange}
                                                />
                                                <FormControl.Feedback />
                                            </FormGroup>
                                            <FormGroup controlId="formFirstname">
                                                <ControlLabel>Firstname</ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="firstname"
                                                    value={this.state.profile.firstname}
                                                    placeholder="Your firstname"
                                                    onChange={this.handleChange}
                                                />
                                                <FormControl.Feedback />
                                            </FormGroup>
                                            <FormGroup controlId="formLastname">
                                                <ControlLabel>Firstname</ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="lastname"
                                                    value={this.state.profile.lastname}
                                                    placeholder="Your lastname"
                                                    onChange={this.handleChange}
                                                />
                                                <FormControl.Feedback />
                                            </FormGroup>
                                            <FormGroup controlId="formGender">
                                                <ControlLabel>Gender</ControlLabel><br/>
                                                <Radio inline
                                                       name="gender"
                                                       value={this.state.profile.gender}
                                                       onChange={this.handleChange}
                                                       checked={this.state.profile.gender === 'f'}>Female</Radio>
                                                <Radio inline
                                                       name="gender"
                                                       value={this.state.profile.gender}
                                                       onChange={this.handleChange}
                                                       checked={this.state.profile.gender === 'm'}>Male</Radio>
                                                <FormControl.Feedback />
                                            </FormGroup>
                                            <FormGroup controlId="formGroup">
                                                <ControlLabel>Group</ControlLabel>
                                                <FormControl
                                                    componentClass="select"
                                                    placeholder="Group"
                                                    name="group"
                                                    value={this.state.profile.group}
                                                    onChange={this.handleChange}
                                                >
                                                    <option value="member">Member</option>
                                                    <option value="admin">Admin</option>
                                                </FormControl>
                                                <FormControl.Feedback />
                                            </FormGroup>
                                            <FormGroup controlId="formActive">
                                                <ControlLabel>Active</ControlLabel><br/>
                                                <Radio inline
                                                       name="active"
                                                       value={this.state.profile.active}
                                                       onChange={this.handleChange}
                                                       checked={this.state.profile.active}>Yes</Radio>
                                                <Radio inline
                                                       name="active"
                                                       value={!this.state.profile.active}
                                                       onChange={this.handleChange}
                                                       checked={!this.state.profile.active}>No</Radio>
                                                <FormControl.Feedback />
                                            </FormGroup>
                                            { this.renderMessage() }
                                            <Button type="submit" className="btn btn-primary">Update</Button>
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