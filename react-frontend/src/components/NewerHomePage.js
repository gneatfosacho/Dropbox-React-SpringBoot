import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import '../Login.css';
import SignUp from "./SignUp";
import FileUpload from "./FileUpload";
import Login from "./Login";
import Container from "./Container";
import Group from "./Group";
import UserDetails from "./UserDetails";
import UserLog from "./UserLog";
import dropbox from "./dropbox-img.png";
import dropboxtitle from "./Dropbox_Log.png";


class NewerHomePage extends Component {

    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <div className="jumbotron">
                       <div className="row justify-content-md-center">
                            <div className="col-md-6">

                                <img className="" src={dropboxtitle}
                                     alt="" height="70"/>

                                <br/><br/><br/>

                                <img className="" src={dropbox}
                                     alt="" />
                            </div>
                            <div className="col-md-4">
                                <Container/>
                            </div>
                       </div>
                    </div>
                )}/>


                <Route exact path="/files" render={() => (

                    <FileUpload/>
                )}/>

                <Route exact path="/userdetails" render={() => (


                    <UserDetails/>
                )}/>

                <Route exact path="/userlog" render={() => (


                    <UserLog/>
                )}/>

                <Route exact path="/groups" render={() => (


                    <Group/>
                )}/>

               {/*<Route exact path="/members" render={() => (


                    <Group/>
                )}/>*/}
            </div>

        );

    }
}

export default withRouter(NewerHomePage);