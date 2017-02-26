/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

import React, {Component} from 'react';
import auth from '../utils/auth'

export default class Logout extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        auth.logout();
        window.location.replace("/");
    }

    render() {
        return (<div></div>);
    }
}