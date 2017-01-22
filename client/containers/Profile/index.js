/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

import React, {Component} from 'react';
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
        this.state = {profile: [], message: ""};
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

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1>Profile: {this.state.profile.firstname} {this.state.profile.lastname}</h1>
                    <hr/>
                    <dl className="dl-horizontal">
                        <dt>Email</dt>
                        <dd>{this.state.profile.email}</dd>
                        <dt>Username</dt>
                        <dd>{this.state.profile.username}</dd>
                        <dt>First Name</dt>
                        <dd>{this.state.profile.firstname}</dd>
                        <dt>Last Name</dt>
                        <dd>{this.state.profile.lastname}</dd>
                        <dt>Gender</dt>
                        <dd>{this.state.profile.gender === 'm' ? 'Male' : 'Female'}</dd>
                        <dt>Group</dt>
                        <dd>{this.state.profile.group}</dd>
                        <dt>Active</dt>
                        <dd>{this.state.profile.active ? "Yes" : "No"}</dd>
                        <dt>Created At</dt>
                        <dd>{dateFormat(this.state.profile.createdAt, "dd/mm/yyyy, HH:MM:ss")}</dd>
                        <dt>Updated At</dt>
                        <dd>{dateFormat(this.state.profile.updatedAt, "dd/mm/yyyy, HH:MM:ss")}</dd>
                    </dl>
                </div>
            </div>
        )
    }


}