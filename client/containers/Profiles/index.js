import React, {Component} from 'react';
import auth from '../utils/auth'
import 'whatwg-fetch';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

/**
 * Manage all users profiles.
 */
export default class Profiles extends Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {profiles: []};
    }

    getProfilesData(cb) {
        fetch(auth.getServerUrl() + '/users?api_key=' + auth.getToken(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            return res.json().then(function (data) {
                if (res.status === 200) {
                    cb(data);
                }
            });
        });
    }

    componentWillMount() {
        this.getProfilesData((data) => {
            this.setState({profiles: data});
        });
    }

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1>Profiles</h1>
                    <BootstrapTable data={ this.state.profiles }>
                        <TableHeaderColumn dataField='_id' isKey={ true }>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='firstname'>Firstname</TableHeaderColumn>
                        <TableHeaderColumn dataField='lastname'>Lastname</TableHeaderColumn>
                        <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }
}