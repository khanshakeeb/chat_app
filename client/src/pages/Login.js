import React, { Component } from 'react';
import { Button, Form, FormGroup, Input,Row,Col,Alert } from 'reactstrap';
import  { Redirect } from 'react-router-dom';
import ChatAPI from '../utility/chatAPI';
import appLocalStorage from '../utility/appLocalStorage';

export default class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      isRedirectUrl: false,
      isError: false,
      errorMessages: []
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
    const errorMessage = [];
    ChatAPI.login(this.state).then( (response)=> {
      console.log("response",response);
      let data = response.data.data;
      if(!response.data.error && data.token){
        appLocalStorage.set('authenticatedUser',data);
        this.setState({
          isRedirectUrl: true
        });
      }else{
        console.log("====error case=====",response.data.error,data.token);
        errorMessage.push(
          <Alert color="danger">
            There is some error occur at server you couldn't able to signin. Please try again.
          </Alert>
        );
        this.setState({
          isError: true,
          errorMessages: errorMessage
        });
      }
      
    })
    .catch((error)=> {
      console.log("error ",error);
      errorMessage.push(
        <Alert color="danger">
          There is some error occur at server you couldn't able to signin. Please try again.
        </Alert>
      );
      this.setState({
        isError: true,
        errorMessages: errorMessage
      });
    });
  }

  componentDidUpdate(){
    let isAuthenticated = appLocalStorage.get('authenticatedUser');
    console.log("dsfdsfds", isAuthenticated);
    if(isAuthenticated && isAuthenticated.userId) this.setState({isRedirectUrl:true});
  }

  render() {
    let isAuthenticated = appLocalStorage.get('authenticatedUser');
    if(this.state.isRedirectUrl || (isAuthenticated && isAuthenticated.userId)){
      return  <Redirect to='/chat/messages'/>;
    }
   
    return (
       <Row>
         <Col sm="12" md={{ size: 8, offset: 2 }}>
         {this.state.errorMessages}
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
              required
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
            required  
            />
          </Col>
          </FormGroup>  
          <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" color="success" disabled={!this.state.password}>Sign in</Button>
          </Col>
        </FormGroup>        
        </Form>
        </Col>
        </Row>
    );
  }
}
