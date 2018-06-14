import React, {Component} from 'react';
import '../FileUpload.css';
import { Route, withRouter } from 'react-router-dom';


class LeftNavBar extends Component {


    render(){
        return(
            <div className="col-sm-2 sidenav">

                <button className="btn btn-primary btn-block" type="submit"
                        onClick={() => this.props.history.push("/userdetails")}>User Profile</button>
                <hr/>
                <button className="btn btn-primary btn-block" type="submit"
                        onClick={() => this.props.history.push("/userlog")}>
                    User Activity
                </button>
                <br/>

            </div>

        )}

}


export default withRouter(LeftNavBar);