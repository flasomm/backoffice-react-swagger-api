import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Geosuggest from 'react-bootstrap-geosuggest';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    render() {
        const styles = require('./styles.css');
        return (
            <div className="formSignin">
                <Helmet title="Sign Up"/>
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                    >
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Email address"
                            onChange={this.handleChange}
                        />
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Username"
                            onChange={this.handleChange}
                        />
                        <FormControl
                            type="password"
                            value={this.state.value}
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                        <FormControl
                            type="password"
                            value={this.state.value}
                            placeholder="Confirm password"
                            onChange={this.handleChange}
                        />
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Firstname"
                            onChange={this.handleChange}
                        />
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Lastname"
                            onChange={this.handleChange}
                        />
                        <Geosuggest placeholder="City"/>
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                        <Button bsStyle="primary" type="submit" className="signup-button">Sign Up</Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}