/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

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
        this.state = {profiles: [], message: ""};
        this.selectRowProp = {mode: 'checkbox'};
        this.options = {
            defaultSortName: 'email',
            defaultSortOrder: 'asc',
            insertBtn: this.renderNewButton.bind(this),
            deleteBtn: this.renderDeleteButton.bind(this),
            afterDeleteRow: this.onAfterDeleteRow.bind(this)
        };
    }

    /**
     *
     */
    componentWillMount() {
        this.fetchProfilesData((data) => {
            this.setState({profiles: data});
        });
    }

    /**
     *
     * @param cb
     */
    fetchProfilesData(cb) {
        fetch(`${auth.getServerUrl()}/users`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': auth.getToken()
            }
        }).then(function (res) {
            return res.json().then(function (data) {
                if (res.status === 200) {
                    cb(data);
                }
            });
        });
    }

    /**
     *
     * @param rowKeys
     */
    onAfterDeleteRow(id) {
        fetch(`${auth.getServerUrl()}/users/${id}?api_key=${auth.getToken()}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            return res.json().then(function (data) {
                if (res.status === 200) {
                    this.setState({message: `User ${data.email} deleted with success`});
                }
            });
        });
    }

    /**
     *
     * @param onClick
     */
    handleDeleteButtonClick = (onClick) => {
        onClick();
    }

    /**
     *
     * @param onClick
     * @returns {XML}
     */
    renderDeleteButton = (onClick) => {
        return (
            <DeleteButton
                btnText='Delete'
                btnContextual='btn-danger'
                className='my-custom-class'
                btnGlyphicon='glyphicon-edit'
                onClick={ e => this.handleDeleteButtonClick(onClick) }/>
        );
    }

    /**
     *
     * @param cell
     * @returns {string}
     */
    genderFormatter(cell) {
        return cell === "m" ? "male" : "female";
    }

    /**
     *
     * @param cell
     * @param row
     * @returns {string}
     */
    actionsFormatter(cell, row) {
        return `<a href="/profile/${cell}" class="btn btn-primary btn-xs" role="button" aria-pressed="true">Edit</a>`;
    }

    /**
     * New Button Web Component.
     * @returns {XML}
     */
    renderNewButton() {
        return (
            <a className="btn btn-info react-bs-table-add-btn" href="/profile/new" role="button">
                <i className="glyphicon glyphicon-plus" style={{fontSize:"12px"}}></i>
                New
            </a>
        );
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
                    <hr/>
                    <BootstrapTable
                        data={ this.state.profiles }
                        selectRow={ this.selectRowProp }
                        options={ this.options }
                        deleteRow
                        insertRow
                        pagination
                        search
                    >
                        <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='username'>Username</TableHeaderColumn>
                        <TableHeaderColumn dataField='firstname'>Firstname</TableHeaderColumn>
                        <TableHeaderColumn dataField='lastname'>Lastname</TableHeaderColumn>
                        <TableHeaderColumn dataField='gender' dataFormat={this.genderFormatter}>Gender</TableHeaderColumn>
                        <TableHeaderColumn dataField='group'>Group</TableHeaderColumn>
                        <TableHeaderColumn dataField='_id' isKey={true} dataFormat={ this.actionsFormatter }></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }

}