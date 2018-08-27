import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input,Col } from 'reactstrap';

export default class Login extends Component {
  render() {
    return (
      <Form horizontal> 
        <FormGroup>
        <Col  sm={2}>
          Email
        </Col>
        <Col  sm={10}>
          <Input type="email" name="email"  placeholder="with a placeholder" />
        </Col>          
        </FormGroup>
        <FormGroup>
        <Col  sm={2}>
          Password
        </Col>
        <Col  sm={10}>
        <Input type="password" name="password" placeholder="password placeholder" />
        </Col>
        </FormGroup>  
        <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">Sign in</Button>
        </Col>
      </FormGroup>
        
      </Form>
    );
  }
}
