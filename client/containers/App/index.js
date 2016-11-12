import React, {Component} from 'react';
import {Link} from 'react-router'
import {Footer} from 'components';
import auth from '../utils/auth';
var config = require('config');

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {isAuthenticated: auth.isAuthenticated()};
        this.updateAuth = this.updateAuth.bind(this);
    }

    updateAuth(isAuthenticated) {
        this.setState({isAuthenticated: isAuthenticated})
    }

    componentWillMount() {
        auth.verifyToken();
    }

    render() {
        const styles = require('./index.css');
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">
                                <span>{config.app.title}</span>
                            </a>
                            <button type="button" className="navbar-toggle collapsed">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="navbar-collapse collapse">
                            {this.state.isAuthenticated ? (
                                <ul className="nav navbar-nav navbar-right">
                                    <li role="presentation" className="dashboard-link">
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li role="presentation" className="logout-link">
                                        <Link to="/logout">Logout</Link>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="nav navbar-nav navbar-right">
                                    <li role="presentation">
                                        <Link to="/signup">Get started for free</Link>
                                    </li>
                                    <li role="presentation">
                                        <Link to="/login">Login</Link>
                                    </li>
                                </ul>
                            )}
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