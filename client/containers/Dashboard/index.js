import React, {Component} from 'react';
import auth from '../utils/auth'
import 'whatwg-fetch';


export default class Dashboard extends Component {

    /**
     * Default constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {usersCount: 0};
    }

    /**
     * Component will mount.
     */
    componentWillMount() {
        fetch(`${auth.getServerUrl()}/users/?api_key=${auth.getToken()}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((data) => {
            this.setState({usersCount: data.length});
        });

    }

    /**
     * Render.
     * @returns {XML}
     */
    render() {
        const styles = require('./styles.css');
        return (
            <div className="container">
                <div className="row">
                    <h1>Dashboard</h1>
                    <hr/>
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <div className="row panel-title">
                                        <div className="col-xs-3">
                                            <i className="fa fa-user-circle-o fa-5x"></i>
                                        </div>
                                        <div className="col-xs-9 text-right">
                                            <div className="huge">{this.state.usersCount}</div>
                                            <div data-reactid="317">New Profiles!</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-footer">
                                    <a href="/profiles">
                                        <span className="pull-left">View Details</span>
                                        <span className="pull-right">
                                            <i className="fa fa-arrow-circle-right"></i>
                                        </span>
                                        <div className="clearfix"></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}