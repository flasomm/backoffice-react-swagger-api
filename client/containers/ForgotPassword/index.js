import React, {Component} from 'react';
import {Input} from 'components';
import Helmet from 'react-helmet';

export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            message: '',
            email: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value, key) {
        var state = {};
        state[key] = value;
        this.setState(state);
    }

    renderMessage() {
        if (this.state.message.length > 0) {
            return (
                <div className={'alert alert-' + this.state.type} role="alert">{this.state.message}</div>
            );
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.refs.email.isValidEmail()) {
            // send email to reset password
        }
    }

    render() {
        const styles = require('./styles.css');
        return (
            <div className="formForgot">
                <Helmet title="Forgot password"/>
                <form id="forgotForm" name="forgotForm" onSubmit={this.onSubmit}>
                    <div className="form-group has-feedback">
                        <label htmlFor="formBasicText" className="control-label">Email address</label>
                        <Input
                            id="formBasicText"
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
                        { this.renderMessage() }
                        <br/>
                        <button type="submit" className="forgot-button btn btn-primary">Send me instructions</button>
                    </div>
                </form>
            </div>
        );
    }
}