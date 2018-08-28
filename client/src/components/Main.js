import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import Signup from '../pages/Signup';

export default class Main extends Component {
  render() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/chat/:conversationType/:id' component={Chat}/>
            </Switch>       
        </div>
           
    );
  }
}
