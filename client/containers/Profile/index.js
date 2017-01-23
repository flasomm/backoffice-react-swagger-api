/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Footer, Input} from 'components';
import auth from '../utils/auth'
import 'whatwg-fetch';
import dateFormat from 'dateformat';

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
        fetch(`${auth.getServerUrl()}/user/${this.props.params.id}?api_key=${auth.getToken()}`, {
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

    handleChange(value, key) {
        var state = {};
        state.profile[key] = value;
        this.setState(state);
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
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <span className="panel-title">Basic Form Elements</span>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="formEditProfile">
                                            {this.state.profile.group}
                                            {this.state.profile.active ? "Yes" : "No"}
                                            {this.state.profile.gender === 'm' ? 'Male' : 'Female'}
                                            {dateFormat(this.state.profile.createdAt, "dd/mm/yyyy, HH:MM:ss")}
                                            {dateFormat(this.state.profile.updatedAt, "dd/mm/yyyy, HH:MM:ss")}
                                            <form id="loginForm" name="loginForm" onSubmit={this.onSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="email" className="control-label">Email address</label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        ref="email"
                                                        className="form-control"
                                                        value={this.state.profile.email}
                                                        required={true}
                                                        placeholder="Your email"
                                                        maxLength="100"
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="username" className="control-label">UserName</label>
                                                    <Input
                                                        id="username"
                                                        type="username"
                                                        name="username"
                                                        ref="username"
                                                        className="form-control"
                                                        value={this.state.profile.username}
                                                        required={true}
                                                        placeholder="Your username"
                                                        maxLength="100"
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="firstname" className="control-label">First Name</label>
                                                    <Input
                                                        id="firstname"
                                                        type="firstname"
                                                        name="firstname"
                                                        ref="firstname"
                                                        className="form-control"
                                                        value={this.state.profile.firstname}
                                                        required={true}
                                                        placeholder="Your firstname"
                                                        maxLength="100"
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="lastname" className="control-label">Last Name</label>
                                                    <Input
                                                        id="lastname"
                                                        type="lastname"
                                                        name="lastname"
                                                        ref="lastname"
                                                        className="form-control"
                                                        value={this.state.profile.lastname}
                                                        required={true}
                                                        placeholder="Your lastname"
                                                        maxLength="100"
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                { this.renderMessage() }
                                                <button type="submit" className="btn btn-primary">Save</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }


}