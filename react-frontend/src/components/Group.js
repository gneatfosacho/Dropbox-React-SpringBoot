import React, {Component} from 'react';
import {Row,Col,ListGroupItem} from 'react-bootstrap';
import Modal from 'react-modal';
import '../FileUpload.css';
import ListGroup from "./ListGroup";
import {connect} from 'react-redux';
import "react-table/react-table.css";
import Header from "./Header";
import GroupRightNavBar from "./GroupRightNavBar";
import MemberRightNavBar from "./MemberRightNavBar";
import ListMembers from "./ListMembers";
import LeftNavBar from "./LeftNavBar";


class Group extends Component {


    state = { index:'', group:'', entergroup:''};

    openGroup=(groupdata)=>{
        console.log(groupdata);

        this.setState({group:groupdata, entergroup:'T'});

    }

    navigatetogroups=()=>{


        this.setState({entergroup:''});

    }
    render(){

console.log(this.state.group.members)
        return (

            <div className="container-fluid">
                <Header/>

                {/*{ this.state.message===''?'':(
                    <div className="text-danger">
                        {this.state.message}
                    </div>)
                }
*/}
                <div className="jumbotron">



                    <div className="container-fluid">


                        <div className="row">
                            <LeftNavBar/>
                            <div className="col-sm-1"></div>
                            {this.state.entergroup==''?
                                <ListGroup openGroup={this.openGroup}/>
                                :
                                <ListMembers group={this.state.group}/>}

                            <div className="col-sm-1 "></div>
                            {this.state.entergroup==''?
                                <GroupRightNavBar/>
                                :
                                <MemberRightNavBar index={this.state.index}
                                                   group={this.state.group}
                                                   navigatetogroups={this.navigatetogroups}/>}

                        </div>
                    </div>
                </div>
            </div>
        );
    }


}


export default Group;
