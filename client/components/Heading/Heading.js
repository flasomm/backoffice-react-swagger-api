import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Heading extends Component {

    render() {
        return (
            <div className="col-md-4">
                <h2>Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
                    nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio
                    dui. </p>
                <p><Button>View details &raquo;</Button></p>
            </div>
        );
    }
}