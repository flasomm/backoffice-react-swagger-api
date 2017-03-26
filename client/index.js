/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {applyRouterMiddleware, Router, browserHistory} from 'react-router';
import {useScroll} from 'react-router-scroll';
import routes from './routes';
import './css/styles.css';
require('font-awesome/css/font-awesome.css');

ReactDOM.render((
    <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
        {routes()}
    </Router>
), document.getElementById('app'));

