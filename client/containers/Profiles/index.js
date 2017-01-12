import React, {Component} from 'react';
import auth from '../utils/auth'
import 'whatwg-fetch';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Modal from 'react-modal';

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
        this.state = {profiles: [], modalIsOpen: false};
        this.openModal = this.openModal.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    componentWillMount() {
        this.getProfilesData((data) => {
            this.setState({profiles: data});
        });
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

    handleModalClose() {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({modalIsOpen: false});
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


    createEditForm = (object) => {
        let editForm = [];
        Object.keys(object).map((key) => {
            editForm.push(
                <div className='form-group' key={ key }>
                    <label>{ key } : </label>
                    <input ref={ key } type='text' id={ key } defaultValue={row[key]} className="form-control"/>
                </div>
            );
        });
        return (editForm.join());
    }

    openModal() {
        this.setState({modalIsOpen: true});
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
        return (
            <button onClick={this.openModal}>
                <span className="glyphicon glyphicon-pencil"></span>
            </button>
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
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.handleModalClose}
                    contentLabel="Example Modal"
                >
                    <div>Test</div>
                </Modal>
            </div>
        )
    }
}