import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import appLocalStorage from '../utility/appLocalStorage';
import ChatAPI from '../utility/chatAPI';


export default class Logout extends Component {
    constructor(props){
        super(props);
        this.state = {
          isRedirect:false,
          isError:false
        };
    }

    componentDidMount(){
        let currentUser = appLocalStorage.get('authenticatedUser');
        ChatAPI.logout(currentUser.token).then(()=>{
            appLocalStorage.remove('authenticatedUser');
            this.setState({isRedirect:true});
        }).catch(e=>{
            this.setState({isError: true});
        });
        
    }
    render() {
        const {isRedirect,isError} = this.state;
        if(isRedirect) return <Redirect to={`/`} />
        if(isError) return <div>There are errors in signout process</div>;
        return (
            <div>Signout in process...</div>
        );
    }
  }