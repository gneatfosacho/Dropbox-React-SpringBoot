import React, {Component} from 'react';
import '../FileUpload.css';
import Modal from 'react-modal';
import * as API from '../api/API';
import {Row,Col,ListGroupItem} from 'react-bootstrap';
import { Route, withRouter } from 'react-router-dom';
import {addGroup} from "../actions/index";
import {connect} from 'react-redux';

class GroupRightNavBar extends Component {

    state = { isModalOpen: false, groupname:'', message:''}

    addGroup(data){
console.log(data)
        API.addGroup(data)
            .then((res) => {

                console.log(res)
                if (res.status == 200) {
                    res.json().then(grp => {

                        console.log(grp);

                        this.props.addGroup(grp);
                    });
                    this.setState({ message: res.message })

                }else if (res.status == 401) {

                    this.setState({ message: res.message })
                }
            });
    }

    openModal() {
        this.setState({ isModalOpen: true })
    }

    closeModal(data) {
        console.log(data);

        {data!=""?

            ( data.groupname!="" ?this.addGroup(data):''):''
                }

        this.setState({ isModalOpen: false})
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

        return(
            <div className="col-sm-2 sidenav">

                <button className="btn btn-primary btn-block" type="submit"
                        onClick={() => this.openModal()}>
                    Add Group
                </button>

                <br/>

                <Modal isOpen={this.state.isModalOpen} style={this.style} onClose={() => this.closeModal()}>
                    <ListGroupItem>
                        <Row className="show-grid">
                            <Col md={4}>Group Name:</Col>
                            <Col md={8}>
                                <input type="text" className="form-control" required="true" autoFocus
                                       onChange={(event) => {
                                           this.setState({
                                               groupname: event.target.value
                                           });
                                       }}/>
                            </Col>

                        </Row>
                        <br/>

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

        )}

}




/*
function mapStateToProps(reducerdata) {
    console.log(reducerdata);
    const groupdata = reducerdata.groupreducer;
    console.log(groupdata)
    return {groupdata};
}
*/

function mapDispatchToProps(dispatch) {
    return {

        addGroup : (data) => dispatch(addGroup(data))
    };
}

export default withRouter(connect(null, mapDispatchToProps)(GroupRightNavBar));

