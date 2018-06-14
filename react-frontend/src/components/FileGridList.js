import React, {Component} from 'react';
import {Row,Col,ListGroupItem} from 'react-bootstrap';
import Modal from 'react-modal';

import '../FileUpload.css';
import * as API from '../api/API';
import { Route, withRouter } from 'react-router-dom';
import {markStar} from "../actions/index";
import {connect} from 'react-redux';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import index from "../reducers/index";


class FileGridList extends Component {



    state = { index:'', isModalOpen: false, shareEmail:'', file:'' , group:'', downloadLink:''}

    openModal(index, file, downloadLink) {
        this.setState({ index:index, isModalOpen: true , file: file, downloadLink:downloadLink, showLink:false})
    }

    closeModal(data) {

        if(data!=""){

            if(data.shareEmail!=""){

                this.props.sharefile(data)
            }

            if(data.group!=""){

                this.props.sharefileingroup(data)
            }
        }

        this.setState({ isModalOpen: false, showLink: true })
    }

    generateLink(){
        this.setState({ showLink: true })
    }

    markStar(index, filepath, starred){

        const data={"filepath":filepath, "starred":starred}

        API.markStar(data)
            .then((res) => {

                if (res.status == 200) {
                    console.log(res);

                    this.props.markStar(index, starred);

                }else if (res.status == 401) {

                    this.setState({ message: res.message })
                }
            });
    }


    style = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };



    render(){


    return (

        <div className="col-sm-6">

            <table className="table table-striped table-condensed table-hover table-bordered">
                    <thead>
                    <tr className="justify-content-md-left">

                        <th>Type</th>
                        <th>Name</th>
                        <th>Members</th>

                    </tr>
                    </thead>

                    <tbody>

                    {this.props.filedata.files.map((file, index) => {


                      //  if(file.fileparent==this.props.parentFile || (file.isfile=='T' && file.owner!= this.props.userEmail )) {
                        var downloadlink= 'http://localhost:8080/files/'+file.filename+'?filepath='+file.filepath

                        return (
                                <tr className="justify-content-md-center">

                                    <td>
                                        <div className="row justify-content-md-left">

                                            <div className="col-md-1">
                                                {file.starred=="T"?
                                                    <a href="#" className="link-title "
                                                       onClick={() => this.markStar(index, file.filepath, "F")}>

                                                    <span className="fa fa-star" ></span>

                                                    </a>
                                                :
                                                    <a href="#" className="link-title "
                                                       onClick={() => this.markStar(index, file.filepath, "T")}>

                                                    <span className="fa fa-star-o"></span>
                                                    </a>}
                                            </div>
                                            <div className="col-md-1">
                                                {file.isfile=='T'?
                                                <span className="fa fa-file"></span>:
                                                <span className="fa fa-folder"></span>
                                                }
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {file.isfile=='F'?
                                        <a href="#" className="link-title "
                                               onClick={() => this.props.openFileFolder(file)}>
                                                {file.filename}
                                        </a>
                                        :
                                        <a href={downloadlink} className="link-title "
                                          >
                                            {file.filename}
                                        </a>
                                        }

                                    </td>
                                    <td>
                                        {file.sharedcount===0?
                                            <div>Only You</div>:
                                        <div className="row justify-content-md-left">
                                            <div className="col-md-1">{file.sharedcount}</div>
                                            <div>members</div>
                                        </div>
                                            }

                                    </td>

                                    <td>
                                        <button className="btn btn-primary" type="submit"
                                                onClick={() => this.props.deleteFile(index, file)}>
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" type="submit"
                                                onClick={() => this.openModal(index, file, downloadlink)}>
                                            Share
                                        </button>

                                    </td>

                                </tr>
                            );
                     //   }
                    })}
                    </tbody>
                </table>
                <Modal isOpen={this.state.isModalOpen} style={this.style} onClose={() => this.closeModal()}>
                    <ListGroupItem>

                        <Row className="show-grid">
                            <Col md={3}>Email:</Col>

                            <Col md={9}>
                                <input type="text" className="form-control" required="true" autoFocus placeholder="Enter semi-colon separated emails"
                                       onChange={(event) => {
                                           this.setState({
                                               shareEmail: event.target.value
                                           });
                                       }}/>
                            </Col>

                        </Row>
                        <br/>
                        <Row className="show-grid">
                            <Col md={3}>Group:</Col>

                            <Col md={9}>
                                <input type="text" className="form-control" required="true" autoFocus placeholder="Enter Group"
                                       onChange={(event) => {
                                           this.setState({
                                               group: event.target.value
                                           });
                                       }}/>
                            </Col>

                        </Row>
                        <Row className="show-grid">
                            <Col md={7}>

                            </Col>

                            <Col md={5}>

                                <a href="#" className="link-title "
                                   onClick={() => this.generateLink()}>
                                    Generate Link
                                </a>
                            </Col>

                        </Row>

                        <Row className="show-grid">

                                {
                                    this.state.showLink==true?
                                        <h6><small>{this.state.downloadLink}</small></h6>
                                        :''
                                }


                        </Row>

                    </ListGroupItem>
                    <br/>
                    <div className=" row justify-content-md-center">
                        <div className=" col-md-4">
                            <button className="btn btn-primary" type="submit"
                                    onClick={() => this.closeModal(this.state)}>Save</button>
                        </div>
                        <div className=" col-md-4">
                            <button className="btn btn-primary" type="submit"
                                    onClick={() => this.closeModal('')}>Close</button>
                        </div>

                    </div>



                </Modal>


        </div>


        );
    }


}



function mapStateToProps(reducerdata) {

    const filedata = reducerdata.filesreducer;

    return {filedata};
}


function mapDispatchToProps(dispatch) {
    return {

        markStar : (index, data) => dispatch(markStar(index, data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileGridList));


