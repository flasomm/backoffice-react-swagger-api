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
                <div className="row">
                    <div className="successMessage">
                        <Helmet title="Sign Up success"/>
                        <p>
                            Your account has been created with success.
                            Check your email for activation.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}