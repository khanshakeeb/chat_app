import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import { Button,Row,Col } from 'reactstrap';
import appLocalStorage from '../utility/appLocalStorage';
import ChatAPI from '../utility/chatAPI';

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRedirect:false,
      userProfile:null
    };

  }
  startChat(){

  }

  componentDidMount(){
    const { params } = this.props.match;
    let currentUser = appLocalStorage.get('authenticatedUser');
    ChatAPI.getUserProfile(params.id,currentUser.token).then((profile)=>{
      const {data} = profile.data;
      this.setState({
        userProfile: data 
      });
    }).catch(e=>console.log(e));
  }

  render() {
   const {userProfile} = this.state;
   if(!userProfile) return <p>Loading profile data..</p>
    return (
        <div>
          <h1>Profile Page</h1>
          <p>First name: {userProfile.firstName}</p>
          <p>Last name: {userProfile.lastName}</p>
          <p>Display name: {userProfile.displayName}</p>
          <p>Email: {userProfile.email}</p>
          <p>About me: {userProfile.aboutMe}</p>
          <div><Button color="success" onClick={this.startChat}>Send message</Button></div>
        </div>
           
    );
  }
}
