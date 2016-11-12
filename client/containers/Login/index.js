import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Footer} from 'components';
import auth from '../utils/auth';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {type: '', message: ''};
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let callback = auth.login(
            this.refs.email.value,
            this.refs.password.value,
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
                                <input type="email"
                                       required
                                       ref="email"
                                       maxLength="30"
                                       onChange={this.handleChange('email')}
                                       placeholder="Your email"
                                       id="email"
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="control-label">Password</label>
                                <input type="password"
                                       required
                                       ref="password"
                                       onChange={this.handleChange('password')}
                                       maxLength="30"
                                       placeholder="Your password"
                                       id="password"
                                       className="form-control"/>
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