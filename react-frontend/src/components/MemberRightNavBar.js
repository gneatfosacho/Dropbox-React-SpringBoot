import React, {Component} from 'react';
import '../FileUpload.css';
import Modal from 'react-modal';
import * as API from '../api/API';
import {Row,Col,ListGroupItem} from 'react-bootstrap';
import { Route, withRouter } from 'react-router-dom';
import {addMember} from "../actions/index";
import {connect} from 'react-redux';

class MemberRightNavBar extends Component {

    state = { isModalOpen: false, member:'', message:''}

    addMember(data){
        data.groupId=this.props.group.groupid;

        console.log(data)
        API.addMember(data)
            .then((res) => {

                console.log(res)
                if (res.status == 200) {
                    console.log(res);
                    res.json().then(data => {
                        console.log(data)
                        this.props.addMember(data);

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

            ( data.member!="" ?this.addMember(data):''):''
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
                    Add Member
                </button>
                <hr/>

                <button className="btn btn-primary btn-block" type="submit"
                        onClick={() => this.props.navigatetogroups()}>
                    Groups
                </button>
                <br/>

                <Modal isOpen={this.state.isModalOpen} style={this.style} onClose={() => this.closeModal()}>
                    <ListGroupItem>
                        <Row className="show-grid">
                            <Col md={4}>Member Email:</Col>
                            <Col md={8}>
                                <input type="text" className="form-control" required="true" autoFocus
                                       placeholder="Enter email" onChange={(event) => {
                                           this.setState({
                                               member: event.target.value
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


function mapDispatchToProps(dispatch) {
    return {

        addMember : (data) => dispatch(addMember(data))
    };
}

export default withRouter(connect(null, mapDispatchToProps)(MemberRightNavBar));

