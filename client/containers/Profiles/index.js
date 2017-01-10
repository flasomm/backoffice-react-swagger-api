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

    /**
     *
     * @param cb
     */
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
     * @param enumObject
     * @param index
     * @returns {XML}
     */
    actionsFormatter(cell, row, enumObject, index) {
        let editForm = [];
        let modalId = `editModal-${cell}`;
        Object.keys(row).map((key) => {
            editForm.push(
                <div className='form-group' key={ key }>
                    <label>{ key } : </label>
                    <input ref={ key } type='text' id={ key } defaultValue={row[key]} className="form-control"/>
                </div>
            );
        });
        return (
            <div>
                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target={'#'+modalId}>
                    <span className="glyphicon glyphicon-pencil"></span>
                </button>
                <div className="modal fade"
                     id={modalId}
                     tabIndex="-1"
                     role="dialog"
                     aria-labelledby="editModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editModalLabel">Edit Profile id: {cell}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {
                                    editForm.map((html) => {
                                        return (html);
                                    })
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    /**
     *
     * @returns {XML}
     */
    render() {
        const options = {
            deleteBtn: this.createDeleteButton,
            insertBtn: this.createInsertButton
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
                        <TableHeaderColumn dataField='email' isKey={true}>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='username'>Username</TableHeaderColumn>
                        <TableHeaderColumn dataField='firstname'>Firstname</TableHeaderColumn>
                        <TableHeaderColumn dataField='lastname'>Lastname</TableHeaderColumn>
                        <TableHeaderColumn dataField='gender' dataFormat={this.genderFormatter}>Gender</TableHeaderColumn>
                        <TableHeaderColumn dataField='group'>Group</TableHeaderColumn>
                        <TableHeaderColumn dataField='_id' dataFormat={ this.actionsFormatter }></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }
}