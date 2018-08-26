import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Hello, world.</h1>
        </div>
      </Router>
      
    );
  }
}
