import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import Geosuggest from 'react-bootstrap-geosuggest';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    render() {
        const styles = require('./styles.css');
        return (
            <div className="formSignin">
                <Helmet title="Sign Up"/>
                <form>
                    <div className="form-group has-feedback">
                        <input type="text" value="" required placeholder="Email address" id="formBasicText" className="form-control"/>
                        <input type="text" value="" required placeholder="Username" id="formBasicText" className="form-control"/>
                        <input type="password" value="" required placeholder="Password" id="formBasicText" className="form-control"/>
                        <input type="password" value="" required placeholder="Confirm password" id="formBasicText" className="form-control"/>
                        <input type="text" value="" required placeholder="Firstname" id="formBasicText" className="form-control"/>
                        <input type="text" value="" required placeholder="Lastname" id="formBasicText" className="form-control"/>
                        <Geosuggest placeholder="City"/>
                        <span className="help-block">Validation is based on string length.</span>
                        <button type="submit" className="signup-button btn btn-primary">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}