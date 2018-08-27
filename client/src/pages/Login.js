import React, { Component } from 'react';
import { Button, Form, FormGroup, Input,Col } from 'reactstrap';
import axio from 'axios';
//import  { Redirect } from 'react-router-dom';
export default class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      confirmPassword: ''
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clickHandler(){
    console.log("dsfdsfdsfsd", this.state);
  }

  handleChange(event){
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault();
  }

  
  render() {
    return (
        <Form horizontal onSubmit={this.handleSubmit}> 
          <FormGroup>
          <Col  sm={2}>
            Email
          </Col>
          <Col  sm={10}>
            <Input 
              type="email" 
              name="email"  
              placeholder="e.g user@example.com"
              defaultValue={this.state.password}
              onChange={this.handleChange} 
            />
          </Col>          
          </FormGroup>
          <FormGroup>
          <Col  sm={2}>
            Password
          </Col>
          <Col  sm={10}>
          <Input 
            type="password" 
            name="password" 
            placeholder="e.g us3r13"
            defaultValue={this.state.password}
            onChange={this.handleChange}   
            />
          </Col>
          </FormGroup>  
          <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" onClick={this.clickHandler}>Sign in</Button>
          </Col>
        </FormGroup>        
        </Form>
    );
  }
}
