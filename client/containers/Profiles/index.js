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
                    <BootstrapTable data={ this.state.profiles } pagination>
                        <TableHeaderColumn dataField='email' isKey={ true }>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='username'>Username</TableHeaderColumn>
                        <TableHeaderColumn dataField='firstname'>Firstname</TableHeaderColumn>
                        <TableHeaderColumn dataField='lastname'>Lastname</TableHeaderColumn>
                        <TableHeaderColumn dataField='gender'>Gender</TableHeaderColumn>
                        <TableHeaderColumn dataField='group'>Group</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }
}