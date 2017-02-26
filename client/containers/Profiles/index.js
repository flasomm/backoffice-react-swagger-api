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
        fetch(`${auth.getServerUrl()}/users?api_key=${auth.getToken()}`, {
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
     */
    handleInsertButtonClick = (onClick) => {
        onClick();
    }

    /**
     *
     * @param onClick
     * @returns {XML}
     */
    createDeleteButton = (onClick) => {
        return (
            <DeleteButton
                btnText='CustomDeleteText'
                btnContextual='btn-success'
                className='my-custom-class'
                btnGlyphicon='glyphicon-edit'
                onClick={ e => this.handleDeleteButtonClick(onClick) }/>
        );
    }

    /**
     *
     * @param onClick
     * @returns {XML}
     */
    createInsertButton = (onClick) => {
        return (
            <InsertButton
                btnText='CustomInsertText'
                btnContextual='btn-warning'
                className='my-custom-class'
                btnGlyphicon='glyphicon-edit'
                onClick={ () => this.handleInsertButtonClick(onClick) }/>
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
     *
     * @returns {XML}
     */
    render() {
        const options = {
            deleteBtn: this.createDeleteButton,
            insertBtn: this.createInsertButton,
            afterDeleteRow: this.onAfterDeleteRow
        };
        const selectRowProp = {
            mode: 'checkbox'
        };
        return (
            <div className="container">
                <div className="row">
                    <h1>Profiles</h1>
                    <hr/>
                    <BootstrapTable
                        data={ this.state.profiles }
                        selectRow={ selectRowProp }
                        options={ options }
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