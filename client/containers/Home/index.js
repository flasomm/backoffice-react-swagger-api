/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Heading, Footer} from 'components';
var config = require('config');

export default class Home extends Component {
    
    render() {

        var headings = [];
        for (var i=0; i < 3; i++) {
            headings.push(<Heading key={i} />);
        }

        return (
            <div>
                <Helmet title="Home"/>
                <div className="jumbotron">
                    <div className="container">
                        <h1>{config.app.title}</h1>
                        <p>{config.app.description}</p>
                        <p><button type="button" className="btn btn-primary">Learn more »</button></p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {headings}
                    </div>
                    <hr/>
                    <Footer/>
                </div>
            </div>
        );
    }
}