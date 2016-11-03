import React, {Component} from 'react';
import Helmet from 'react-helmet';
import cookie from 'react-cookie';
import 'whatwg-fetch'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', type: '', message: ''};
        this.onSubmit = this.onSubmit.bind(this);
        this.sendFormData = this.sendFormData.bind(this);
    }

    handleChange(key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    }

    authenticate() {
    }

    sendFormData() {
        let self = this;
        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(function (res) {
            switch (res.status) {
                case 200:
                    this.authenticate();
                    break;
                case 400:
                    this.setState({type: 'danger', message: res.statusText});
                    break;
                case 404:
                    this.setState({type: 'danger', message: 'Bad credentials'});
                    break;
            }
        }.bind(this));
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({type: 'info', message: 'Connecting...'}, this.sendFormData);
    }

    renderMessage() {
        if (this.state.type.length > 0) {
            return (
                <div className={'alert alert-' + this.state.type} role="alert">{this.state.message}</div>
            );
        }
    }

    render() {
        return (
            <div>
                <Helmet title="Log In"/>
                <form id="loginForm" name="loginForm" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="control-label">Email address</label>
                        <input type="email"
                               required
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
                               onChange={this.handleChange('password')}
                               maxLength="30"
                               placeholder="Your password"
                               id="password"
                               className="form-control"/>
                    </div>
                    { this.renderMessage() }
                    <span className="help-block"><a href="/forgot-password" rel="forgot password">Forgot your password</a></span>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        );
    }
}