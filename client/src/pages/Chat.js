import React, { Component } from 'react';
import appLocalStorage from '../utility/appLocalStorage';

export default class Chat extends Component {
  render() {
    console.log("user object",appLocalStorage.get('authenticatedUser'));
    return (
     <div>
        <p>Chat application will be here</p>
     </div>  
    );
  }
}
