import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input,Row, Col,Alert } from 'reactstrap';
import  { Redirect } from 'react-router-dom';
import ChatAPI from '../utility/chatAPI';
import appLocalStorage from '../utility/appLocalStorage';

export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      confirmPassword:'',
      firstName:'',
      lastName:'',
      aboutMe:'',
      phone:'',
      isRedirectUrl: false,
      formErrors: []
    };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event){
    event.preventDefault();
    let errorMessages = [];
    if(this.state.password !== this.state.confirmPassword){
      errorMessages.push( <Alert color="danger">Password should match!!</Alert>);
      this.setState({
        formErrors: errorMessages
      });
   
      return;
    }
   
    ChatAPI.signup(this.state).then( (response)=> {
      let data = response.data.data;
      if(response.data.error){
        errorMessages.push(  
          <Alert color="danger">
           {response.data.message}
          </Alert>
        );
        this.setState({
          formErrors: errorMessages
        });
      }else{
        appLocalStorage.set('authenticatedUser',data);
        this.setState({
          isRedirectUrl: true
        });
      }
     
    })
    .catch(function (error) {
      console.log("error ",error);
      errorMessages.push(
        <Alert color="danger">
          There we some error occure at server side you unable to signup.Please try again later
        </Alert>
      );
      this.setState({
        formErrors: errorMessages
      });
   
    });
  }
  render() {
   
    let isAuthenticated = appLocalStorage.get('authenticatedUser');
    if(this.state.isRedirectUrl || (isAuthenticated && isAuthenticated.userId)){
      return  <Redirect to='/chat/messages'/>;
    }
    return (
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }} >
          {this.state.formErrors}
          <Form horizontal onSubmit={this.handleSubmit} method='post'>
          <FormGroup>
            <Label >Email</Label>
            <Input 
              type="email" 
              name="email"  
              placeholder="e.g user@test.com" 
              defaultValue={this.state.email}
              onChange={this.handleChange} 
              required
              />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input 
              type="password" 
              name="password" 
              placeholder="e.g us3r13" 
              defaultValue={this.state.password}
              onChange={this.handleChange} 
              required
              />
          </FormGroup>        
          <FormGroup>
            <Label >Confirm Password</Label>
            <Input 
              type="password" 
              name="confirmPassword"  
              placeholder="e.g us3r13" 
              defaultValue={this.state.confirmPassword}
              onChange={this.handleChange} 
              required
              />
          </FormGroup> 
          <FormGroup>
            <Label >First Name</Label>
            <Input 
              type="text" 
              name="firstName"  
              placeholder="Micheal" 
              defaultValue={this.state.firstName}
              onChange={this.handleChange} 
              required
              />
          </FormGroup> 
          <FormGroup>
            <Label >Last Name</Label>
            <Input 
              type="text" 
              name="lastName"  
              placeholder="e.g Bay"  
              defaultValue={this.state.lastName}
              onChange={this.handleChange} 
              required
               />
          </FormGroup> 
          <FormGroup>
            <Label >Phone number</Label>
            <Input 
                type="text" 
                name="phone"  
                placeholder="e.g +4272164432"
                defaultValue={this.state.phone}
                onChange={this.handleChange} 
                required
            />
          </FormGroup> 
          <FormGroup>
            <Label >About Me</Label>
            <Input 
              type="textarea" 
              name="aboutMe"  
              placeholder="e.g I am a JS developer" 
              defaultValue={this.state.aboutMe}
              onChange={this.handleChange} 
              required
              />
          </FormGroup> 
          <Button type="submit" color="success" disabled={!this.state.aboutMe}>Submit</Button>
        </Form>
        </Col>
      </Row>
    );
  }
}
