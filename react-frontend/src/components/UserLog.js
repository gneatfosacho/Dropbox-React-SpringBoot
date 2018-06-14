import React, {Component} from 'react';
import * as API from '../api/API';
import '../Login.css';
import PropTypes from 'prop-types';
import dropbox from "./dropboxplus.gif";
import {connect} from 'react-redux';
import {Row,Col,ListGroupItem} from 'react-bootstrap';

import { Route, withRouter } from 'react-router-dom';
import Header from "./Header";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import {getFileLog} from "../actions/index";
import {getGroupLog} from "../actions/index";


class UserLog extends Component {

    componentWillMount(){

        API.getUserLogs()
            .then((res) => {

                if (res.status == 200) {

                    res.json().then(logs => {
                        this.props.getFileLog(logs);

                    });


                }else if (res.status == 401) {

                    this.props.history.push('/');
                }
            });


        /*API.getState()
            .then((res) => {

                if (res.status == 201) {
                    console.log(res.userdetails)
                    this.props.getFileLog(res.userdetails.filelog);
                    this.props.getGroupLog(res.userdetails.grouplog);
                    console.log("Success...")

                }else if (res.status == 401) {

                    this.props.history.push('/');
                }
            });*/
    }

    render() {
console.log(this.props.userlogdata.filelog)
        return (
            <div>
                <Header/>
            <div className="jumbotron">
                <div className="container-fluid row justify-content-md-center">

                    <div className="account-wall col-md-10">
                        <div className="col-md-12">

                            <h2>User Log</h2>

                            <ReactTable
                                data={this.props.userlogdata.filelog}
                                columns={[
                                    {
                                        Header: "File Name",
                                        columns: [
                                            {
                                                accessor: "filename"
                                            }
                                        ]
                                    },

                                    /*{
                                        Header: "File Path",
                                        columns: [
                                            {
                                                accessor: "filepath"
                                            }
                                        ]
                                    },*/

                                    {
                                        Header: "File Type",
                                        columns: [
                                            {
                                                accessor: "isfile"
                                            }
                                        ]
                                    },

                                    {
                                        Header: "Activity",
                                        columns: [
                                            {
                                                accessor: "action"
                                            }
                                        ]
                                    },

                                    {
                                        Header: "Activity Time",
                                        columns: [
                                            {
                                                accessor: "actiontime"
                                            }
                                        ]
                                    }

                                ]}
                                defaultPageSize={5}
                                className="-striped -highlight"
                            />



                        <br/>



                            <h2>Group Log</h2>

                            <ReactTable
                                data={this.props.userlogdata.grouplog}
                                columns={[
                                    {
                                        Header: "Group Name",
                                        columns: [
                                            {
                                                accessor: "groupname"
                                            }
                                        ]
                                    },
                                    {
                                        Header: "Activity",
                                        columns: [
                                            {
                                                accessor: "action"
                                            }
                                        ]
                                    },

                                    {
                                        Header: "Activity Time",
                                        columns: [
                                            {
                                                accessor: "actiontime"
                                            }
                                        ]
                                    }

                                ]}
                                defaultPageSize={5}
                                className="-striped -highlight"
                            />


                        </div>
                        <br/>
                        <button className="btn btn-primary" type="submit"
                                onClick={() => this.props.history.push("/files")}>
                            Back
                        </button>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(reducerdata) {
console.log(reducerdata)
    const userlogdata = reducerdata.userlogreducer;
    console.log(userlogdata )
    return {userlogdata};
}

function mapDispatchToProps(dispatch) {
    return {

        getFileLog : (data) => dispatch(getFileLog(data)),
        getGroupLog : (data) => dispatch(getGroupLog(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLog));