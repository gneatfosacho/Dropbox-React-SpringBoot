import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import '../Login.css';
import SignUp from "./SignUp";
import Login from "./Login";
import {afterlogin} from "../actions/index";


class Container extends Component {

    state = {
        login: "SI",
        message: ''
    };

    login = (userdata) =>{

        API.doLogin(userdata)
            .then((res)  => {

                if (res.status == 200) {

                    this.props.history.push("/files");

                } else if (res.status == 401) {
                    this.setState({

                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    loginOrSignup = (data) => {

        console.log(data);
        this.setState({
            message:'',
            login:data
        });
    };

    signUp = (userdata) =>{
console.log(userdata)
        API.createUser(userdata)
            .then((res)  => {
                if (res.status == 201) {

                    this.setState({
                        login: "SI",
                        message: "User details saved successfully!"
                    });
                } else if (res.status == 401) {
                    this.setState({

                        message: "Email already exists!"
                    });
                }
            });
    };

    render() {
        return (
            <div className="container-fluid">
                { this.state.message===''?'':(
                    <div className="text-danger">
                        {this.state.message}
                    </div>)
                }


                <h1 className="text-center login-title"></h1>
                <div className="account-wall">
                    <div className="col-md-12">

                        {this.state.login === "SU" ?
                            <SignUp signUp={this.signUp} loginOrSignup={this.loginOrSignup}/>
                            :
                            <Login login={this.login} loginOrSignup={this.loginOrSignup}/>
                        }


                    </div>
                </div>
            </div>

    );


    }
}


export default withRouter(Container);