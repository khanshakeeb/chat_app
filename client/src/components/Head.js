import React, { Component } from 'react';
import {Link} from "react-router-dom";
import appLocalStorage from '../utility/appLocalStorage';
export default class Head extends Component {
  render() {
    let currentUser = appLocalStorage.get('authenticatedUser');
    let isLogin = [];
    if(currentUser){
      isLogin.push(
        <div>
          <span>{`Hello,${currentUser.firstName}  ${currentUser.lastName}`}</span>   
          <span><Link to={`/logout`}> Signout</Link></span>
        </div>
      );
    }else{
      isLogin.push(
        <div>
          <span><Link to={`/login`}> Signin</Link></span>
        </div>
      );
    }     
    return (
      <div>{isLogin}</div>          
    );
  }
}
