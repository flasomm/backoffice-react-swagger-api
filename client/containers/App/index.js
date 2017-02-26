/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

import React, {Component} from 'react';
import {Link} from 'react-router'
import {Footer} from 'components';
import auth from '../utils/auth';
var config = require('config');

/**
 * Main App class.
 */
export default class App extends Component {

    /**
     * Default constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {isAuthenticated: auth.isAuthenticated()};
    }

    /**
     *
     */
    componentWillMount() {
        auth.verifyToken();
    }

    /**
     *
     * @returns {XML}
     */
    displayProfileMenu() {
        if (this.state.isAuthenticated) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#"
                           className="dropdown-toggle"
                           data-toggle="dropdown"
                           role="button"
                           aria-haspopup="true"
                           aria-expanded="false">
                            <span className="capitalize margin-right-10">{auth.getUsername()}</span>
                            <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <a href={`/profile/${auth.getUserId()}`}>
                                    <span className="glyphicon glyphicon-user" aria-hidden="true"></span> My Profile
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Options
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li role="presentation" className="logout-link">
                                <Link to="/logout">
                                    <span className="glyphicon glyphicon-off" aria-hidden="true"></span> Logout
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            );
        }

        return (
            <ul className="nav navbar-nav navbar-right">
                <li role="presentation">
                    <Link to="/signup">Get started for free</Link>
                </li>
                <li role="presentation">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        )
    }

    /**
     *
     * @returns {XML}
     */
    displayMainMenu() {
        if (this.state.isAuthenticated) {
            return (
                <ul className="nav navbar-nav">
                    <li role="presentation" className="dashboard-link">
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <a href="/profiles">Profiles</a>
                    </li>
                    <li>
                        <a href="/favorites">Favorites</a>
                    </li>
                </ul>
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
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">
                                <span>{config.app.title}</span>
                            </a>
                            <button type="button"
                                    className="navbar-toggle collapsed"
                                    data-toggle="collapse"
                                    data-target="#navbar"
                                    aria-expanded="false"
                                    aria-controls="navbar"
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="navbar-collapse collapse">
                            {this.displayMainMenu()}
                            {this.displayProfileMenu()}
                        </div>
                    </div>
                </nav>
                <div >
                    {this.props.children}
                </div>
            </div>
        );
    }
}