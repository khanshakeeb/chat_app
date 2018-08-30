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
    this.startChat = this.startChat.bind(this);
  }
  startChat(){
    const { params } = this.props.match;
    let currentUser = appLocalStorage.get('authenticatedUser');
    console.log("current user", currentUser);
    ChatAPI.startConverstation(params.id,currentUser.userId,currentUser.token).then((conversation)=>{
      let {data} = conversation.data;
      console.log("new conversation created",data);
      this.setState({
        isRedirect: true,
        conversationId: data._id
      });
    }).catch((e)=>console.log(e));
    console.log("start new converstation");
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
   const {userProfile,isRedirect, conversationId} = this.state;
   const { params } = this.props.match;
   let currentUser = appLocalStorage.get('authenticatedUser');
   const sendMessage = [];
   if(isRedirect) return <Redirect to={`/chat/messages/${conversationId}`} />
   if(currentUser.userId !== params.id) sendMessage.push(<div><Button color="success" onClick={this.startChat}>Send message</Button></div>);
   if(!userProfile) return <p>Loading profile data..</p>
    return (
        <div>
          <h1>Profile Page</h1>
          <p>First name: {userProfile.firstName}</p>
          <p>Last name: {userProfile.lastName}</p>
          <p>Display name: {userProfile.displayName}</p>
          <p>Email: {userProfile.email}</p>
          <p>About me: {userProfile.aboutMe}</p>
          {sendMessage}
          
        </div>
           
    );
  }
}
