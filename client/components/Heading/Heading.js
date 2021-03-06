/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

import React, {Component, PropTypes} from 'react';

export default class Heading extends Component {

    render() {
        return (
            <div className="col-md-4">
                <h2>Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
                    nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio
                    dui. </p>
                <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </div>
        );
    }
}