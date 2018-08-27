import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default class Signup extends Component {
  render() {
    return (
        <Form>
        <FormGroup>
          <Label >Email</Label>
          <Input type="email" name="email"  placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" name="password" placeholder="password placeholder" />
        </FormGroup>        
        <FormGroup>
          <Label >Confirm Password</Label>
          <Input type="password" name="confirm_password"  placeholder="confirm password placeholder" />
        </FormGroup> 
        <FormGroup>
          <Label >First Name</Label>
          <Input type="text" name="first_name"  placeholder="First name placeholder" />
        </FormGroup> 
        <FormGroup>
          <Label >Last Name</Label>
          <Input type="text" name="last_name"  placeholder="Last name placeholder" />
        </FormGroup> 
        <FormGroup>
          <Label >Phone number</Label>
          <Input type="text" name="phone_number"  placeholder="Phone number placeholder" />
        </FormGroup> 
        <FormGroup>
          <Label >Phone number</Label>
          <Input type="text" name="phone_number"  placeholder="Phone number placeholder" />
        </FormGroup> 
        <FormGroup>
          <Label >About Me</Label>
          <Input type="textarea" name="about_me"  placeholder="About me placeholder" />
        </FormGroup> 
        <Button>Submit</Button>
      </Form>
    );
  }
}
