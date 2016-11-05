import React, {Component} from 'react';
import auth from '../utils/auth'

export default class Logout extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        auth.logout();
        window.location.replace("/");
    }

    render() {
        return (<div></div>);
    }
}