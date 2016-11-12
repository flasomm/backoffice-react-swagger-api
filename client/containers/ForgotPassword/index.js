import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const styles = require('./styles.css');
        return (
            <div className="formForgot">
                <Helmet title="Forgot password"/>
                <form>
                    <div className="form-group has-feedback">
                        <label htmlFor="formBasicText" className="control-label">Email address</label>
                        <input type="text" value="" placeholder="Your email" id="formBasicText" className="form-control"/>
                        <span className="help-block">Validation is based on string length.</span>
                        <button type="submit" className="forgot-button btn btn-primary">Send me instructions</button>
                    </div>
                </form>
            </div>
        );
    }
}