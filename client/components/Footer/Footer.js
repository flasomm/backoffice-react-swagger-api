import React, {Component, PropTypes} from 'react';
var config = require('config');

export default class Footer extends Component {

    render() {
        return (
            <footer>
                <p>&copy; {new Date().getFullYear()} {config.app.title}</p>
            </footer>
        );
    }
}