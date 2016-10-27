import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Heading, Footer} from 'components';
import Button from 'react-bootstrap/lib/Button';
var config = require('config');

export default class Home extends Component {
    render() {
        const styles = require('./index.css');
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
                        <p><Button bsStyle="primary">Learn more &raquo;</Button></p>
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