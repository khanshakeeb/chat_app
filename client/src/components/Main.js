import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Chat from '../pages/Chat';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';

export default class Main extends Component {
  render() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/logout' component={Logout}/>
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/chat/messages/:id?' component={Chat}/>
                <Route exact path='/profile/:id' component={Profile}/>
            </Switch>       
        </div>
           
    );
  }
}
