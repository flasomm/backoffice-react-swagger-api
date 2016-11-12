import React, {Component, PropTypes} from 'react';
import {InputError} from 'components';
import {isEmpty, isNil} from 'lodash';

export default class Input extends Component {

    constructor(props) {
        super(props);
        var valid = (this.props.isValid && this.props.isValid()) || true;
        this.state = {valid: valid, value: null, errorMessage: this.props.errorMessage, errorVisible: false};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        if (this.props.validate) {
            this.validate(e.target.value);
        }
        if (this.props.onChange) {
            this.props.onChange(e.target.value, this.props.name);
        }
    }

    isValidEmail() {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.state.value);
    }

    isValid() {
        if (isEmpty(this.state.value)) {
            this.setState({valid: false, errorVisible: true});
        }
        if (!isNil(this.props.validate) && !this.props.validate(this.state.value)) {
            this.setState({valid: false, errorVisible: true});
        }

        return this.state.valid;
    }

    validate(value) {
        if (this.props.validate && this.props.validate(value)) {
            this.setState({valid: true, errorVisible: false});

        } else {
            this.setState({valid: false, errorVisible: true});
        }
    }

    render() {
        return (
            <div>
                <input
                    id={this.props.id}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={this.handleChange}
                    required={this.props.required}
                    className={this.props.className}
                    value={this.props.value}
                    type={this.props.type}
                />
                {!this.state.valid && <InputError errorMessage={this.state.errorMessage} visible={this.state.errorVisible}/>}
            </div>
        )
    }
}