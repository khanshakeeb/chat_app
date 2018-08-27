import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Container } from 'reactstrap';
import Main from './components/Main';
import Head from './components/Head';
export default class App extends Component {
  render() {
    return (
      <Router>
        <Container>
        <Head />
          <Main />
        </Container>
         
      </Router>      
    );
  }
}
