import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';

export default class Signup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const styles = require('./styles.css');

        return (
            <div className="container">
                <Helmet title="Sign Up success"/>
                <div className="row">
                    <div className="successMessage">
                        <div className="alert alert-success" role="alert">
                            Your account has been created with success.
                            Check your email for activation.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}