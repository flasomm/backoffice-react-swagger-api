import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <Helmet title="Log In"/>
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Email address</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Your email"
                            onChange={this.handleChange}
                        />
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.value}
                            placeholder="Your password"
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                        <HelpBlock><a href="/forgot-password" rel="forgot password">Forgot your password</a></HelpBlock>
                        <Button bsStyle="primary" type="submit">Log In</Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}