import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input,Row, Col } from 'reactstrap';
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
    console.log("event object onchange",event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event){
    event.preventDefault();
    if(this.state.password !== this.state.confirmPassword){
      this.state.formErrors.push(<li>Password should match!!</li>);
      return;
    }
   
    ChatAPI.signup(this.state).then( (response)=> {
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
    const {isRedirectUrl,formErrors} = this.state;
    let isAuthenticated = appLocalStorage.get('authenticatedUser');
    if(this.state.isRedirectUrl || (isAuthenticated && isAuthenticated.userId)){
      return  <Redirect to='/chat/messages'/>;
    }
    return (
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }} >
          <div>{formErrors}</div>  
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
