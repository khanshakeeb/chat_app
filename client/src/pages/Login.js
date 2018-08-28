import React, { Component } from 'react';
import { Button, Form, FormGroup, Input,Col } from 'reactstrap';
import  { Redirect } from 'react-router-dom';
import ChatAPI from '../utility/chatAPI';
import appLocalStorage from '../utility/appLocalStorage';

export default class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      isRedirectUrl: false
    };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  

  handleChange(event){
    console.log("event object onchange",event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    console.log("dsfdsfdsfsd", this.state);
    ChatAPI.login(this.state).then( (response)=> {
      console.log("response",response);
      let data = response.data.data;
      appLocalStorage.set('authenticatedUser',data);
      this.setState({
        isRedirectUrl: true
      });
    })
    .catch(function (error) {
      console.log("error ",error);
    });
  }

  
  render() {
    if(this.state.isRedirectUrl){
      return  <Redirect to='/chat/channel/5b824dd0d9f516140f5af240'/>;
    }
    return (
        <Form horizontal onSubmit={this.handleSubmit} method='post'> 
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
            <Button type="submit" >Sign in</Button>
          </Col>
        </FormGroup>        
        </Form>
    );
  }
}
