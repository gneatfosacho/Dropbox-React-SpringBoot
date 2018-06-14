import React, {Component} from 'react';
import * as API from '../api/API';
import FileGridList from "./FileGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux';
import {addFile} from "../actions/index";
import {deleteFile} from "../actions/index";
import RightNavBar from "./RightNavBar";
import LeftNavBar from "./LeftNavBar";
import {afterlogin} from "../actions/index";
import {getFiles} from "../actions/index";
import {sharedCount} from "../actions/index";
import Header from "./Header";
import { Route, withRouter } from 'react-router-dom';



class FileUpload extends Component {

    state = {
        message: '',
        fileparent:''
    };

    componentWillMount(){

        API.getUserDetails()
            .then((userres) => {

                if (userres.status == 200) {

                    userres.json().then(userdata => {
                        localStorage.setItem("email", userdata.email);
                        this.props.afterlogin(userdata);
                    });

                    API.getFilesForUser()
                        .then((fileres) => {

                            if (fileres.status == 200) {

                                fileres.json().then(files => {
                                    this.props.getFiles(files);
                                });

                                console.log("Success...")

                            }else if (fileres.status == 401) {

                                this.props.history.push('/');
                            }
                        });

                }else if (userres.status == 401) {

                    this.props.history.push('/');
                }
            });


    }

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('file', event.target.files[0]);

        payload.append('fileparent', this.state.fileparent);

        console.log(this.state.fileparent)

        API.uploadFile(payload)
        .then((res) => {

            if (res.status == 200) {

                res.json().then(filedata => {
                    this.props.addFile(filedata);
                });

                this.setState({

                    message: "File uploaded successfully"
                });

            }else if (res.status == 401) {
                this.setState({

                    message: "File error"
                });
            }
        });
    };

    deleteFile=(index, file) => {


        API.deleteFile(file)
            .then((res) => {
                console.log(res);
                if (res.status == 200) {

                    console.log("Delete success")
                    this.props.deleteFile(index);
                    this.setState({

                        message: "File deleted successfully!"
                    });
                }else if (res.status == 401) {
                    this.setState({

                        message: "Error deleting file!"
                    });
                }

            });

    }

    makeFolder=(folder) => {

        API.makeFolder(folder)
            .then((res) => {
console.log(folder);
                if (res.status == 200) {

                    res.json().then(folder => {

                        this.props.addFile(folder);
                        this.setState({

                            message: "folder created successfully"
                        });
                    });


                }else if (res.status == 401) {
                    this.setState({

                        message: "Error creating folder!"
                    });
                }
            });

    }

    sharefile=(filedata) => {

        this.setState({

            message: ''
        });

        var emailList=filedata.shareEmail.trim().split(';');


        for (var key in emailList) {

            const data = {filedata: filedata.file, shareEmail: emailList[key]}

            API.shareFile(data)
                .then((res) => {

                    if (res.status == 200) {
console.log('dataaa..',data);
                        if(!filedata.index)
                            filedata.index = this.props.filesdata.files.length-1;
                        this.props.sharedCount(filedata.index, data.filedata.sharedcount+1);
                        this.setState({

                            message: this.state.message+" File Shared with "+data.shareEmail+"!"
                        });
                        console.log("Success...")

                    } else if (res.status == 401) {

                        this.setState({

                            message: this.state.message+" "+data.shareEmail+" does not exist!"
                        });
                    }
                });
        }



    }

    sharefileingroup=(data) => {

        API.shareFileInGroup(data)
            .then((res) => {

                if (res.status == 201) {

                    this.props.sharedCount(data.index, res.sharedcount);
                    this.setState({

                        message: " File Shared with "+data.group+" group!"
                    });
                    console.log("Success...")

                } else if (res.status == 401) {

                    this.setState({

                        message: this.state.message+" "+data.group+" does not exist!"
                    });
                }
            });




    }

    makeSharedFolder=(data) => {
        console.log(data);
        API.makeFolder(data)
            .then((res) => {

                if (res.status == 200) {

                    res.json().then(folder => {
                        console.log(folder);
                       // data.filepath=folder;
                        this.props.addFile(folder);
                        const shareddata={file:folder, shareEmail:data.shareEmail}
                        this.sharefile(shareddata)
                        this.setState({

                            message: "folder created successfully"
                        });
                    });


                }else if (res.status == 401) {
                    this.setState({

                        message: "Folder error"
                    });
                }
            });

    }


    openFileFolder=(filedata) =>{
console.log(filedata)
        if(filedata.isfile=='F'){

            this.setState({
                 fileparent:filedata.filepath
             });
            console.log(this.state.fileparent)

            API.getFileList(filedata.filepath)
                .then((res) => {

                    if (res.status == 200) {

                        res.json().then(files => {
                            this.props.getFiles(files);
                        });

                        console.log("Success...")

                    }else if (res.status == 401) {

                        console.log("Failure...")
                    }

                });

        }

        else{


            API.getFile(filedata.filepath)
                .then((res) => {
                    console.log("hello");
                console.log(res);


                });
        }


    }

    navigateHome(){


        API.getFilesForUser()
            .then((fileres) => {

                if (fileres.status == 200) {

                    fileres.json().then(files => {
                        this.props.getFiles(files);
                        this.setState({

                            fileparent:""
                        });
                    });

                    console.log("Success...")

                }else if (fileres.status == 401) {

                    this.props.history.push('/');
                }
            });


        /* API.getState()
             .then((res) => {

                 if (res.status == 201) {

                     this.setState({
                         fileparent:""
                     });
                     this.props.getFiles(res.userdetails.files);
                     console.log("Success...")

                 }else if (res.status == 401) {

                     this.props.history.push('/');
                 }
             });*/

    }

    render() {


        console.log(this.state.fileparent);
        return (

            <div className="container-fluid">
                <Header/>

                { this.state.message===''?'':(
                    <div className="text-danger">
                        {this.state.message}
                    </div>)
                }

            <div className="jumbotron">

                <div className="row justify-content-md-center">


                <TextField

                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />
                </div>
                <br/><br/>

                <div className="container-fluid">
                    <div className="row">

                        <div className="col-sm-7 ">
                            <a href="#" className="link-title "
                               onClick={() => this.navigateHome()}>
                                Dropbox
                            </a>
                        </div>
                    </div>

                    <div className="row">
                        <LeftNavBar/>
                        <div className="col-sm-1 "></div>
                        <FileGridList deleteFile={this.deleteFile}
                                      sharefileingroup={this.sharefileingroup}
                                      sharefile={this.sharefile}
                                      openFileFolder={this.openFileFolder}
                                      parentFile={this.state.fileparent}/>
                        <div className="col-sm-1 "></div>
                        <RightNavBar makeFolder={this.makeFolder}
                                     makeSharedFolder={this.makeSharedFolder}
                                     parentFile={this.state.fileparent}/>
                    </div>
                </div>

            </div>


</div>


        );
    }
}



function mapStateToProps(reducerdata) {
    console.log(reducerdata);

    const filesdata = reducerdata.filesreducer;
    return {filesdata};
}

function mapDispatchToProps(dispatch) {
    return {

        addFile : (data) => dispatch(addFile(data)),
        deleteFile : (index) => dispatch(deleteFile(index)),
        afterlogin : (data) => dispatch(afterlogin(data)),
        getFiles : (data) => dispatch(getFiles(data)),
        sharedCount : (index, data) => dispatch(sharedCount(index, data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileUpload));


