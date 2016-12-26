import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Footer, Input} from 'components';
import auth from '../utils/auth';

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

    handleChange(value, key) {
        var state = {};
        state[key] = value;
        this.setState(state);
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
                <div className={'alert alert-' + this.state.type} role="alert">{this.state.message}</div>
            );
        }
    }

    render() {
        const styles = require('./styles.css');
        return (
            <div className="container">
                <div className="row">
                    <div className="formLogin">
                        <Helmet title="Log In"/>
                        <form id="loginForm" name="loginForm" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email" className="control-label">Email address</label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    ref="email"
                                    className="form-control"
                                    value={this.state.email}
                                    required={true}
                                    placeholder="Your email"
                                    maxLength="100"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="control-label">Password</label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref="password"
                                    className="form-control"
                                    value={this.state.password}
                                    required={true}
                                    placeholder="Your password"
                                    maxLength="30"
                                    onChange={this.handleChange}
                                />
                            </div>
                            { this.renderMessage() }
                            <span className="help-block">
                                <a href="/forgot-password" rel="forgot password">Forgot your password</a>
                            </span>
                            <button type="submit" className="btn btn-primary">Log In</button>
                        </form>
                    </div>
                </div>
                <hr/>
                <Footer/>
            </div>
        );
    }
}