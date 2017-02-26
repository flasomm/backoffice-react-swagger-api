/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

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