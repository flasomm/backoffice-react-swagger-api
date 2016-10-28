import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {applyRouterMiddleware, Router, browserHistory} from 'react-router';
import {useScroll} from 'react-router-scroll';
import routes from './routes';

ReactDOM.render((
    <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
        {routes()}
    </Router>
), document.getElementById('app'));
