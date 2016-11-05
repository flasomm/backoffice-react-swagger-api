import React, {Component} from 'react';
import auth from '../utils/auth'

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const token = auth.getToken();

        return (
            <div className="container">
                <div className="row">
                    <h1>Dashboard</h1>
                    <p>You made it!</p>
                    <p>{token}</p>
                </div>
            </div>
        )
    }
}