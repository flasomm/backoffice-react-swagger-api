import React, {Component, PropTypes} from 'react';

export default class InputError extends Component {
    render() {
        const styles = require('./styles.css');
        var divStyle = {
            display: this.props.visible ? 'inline-block' : 'none'
        };
        return (
            <div className="alert alert-danger" role="alert" style={divStyle}>
                {this.props.errorMessage}
            </div>
        )
    }
}