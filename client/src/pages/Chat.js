import React, { Component } from 'react';
import { Button,Input } from 'reactstrap';
import chatSocket from '../utility/socket';
import ChatAPI from '../utility/chatAPI';
import appLocalStorage from '../utility/appLocalStorage';

export default class Chat extends Component {
  constructor(props){
    super(props);
    this.state={
      chatHistory:'',
      textMessage:''
    };
    chatSocket.recievedMessage((message)=>{
      this.setState({chatHistory: message});
    });
    
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSendMessage(){
    console.log(this.state.textMessage);
    chatSocket.sendMessage(this.state.textMessage);
  }

  componentDidMount(){
    let authenticatedUser = appLocalStorage.get('authenticatedUser');
    console.log("authenticated user",authenticatedUser);
    /**
     * @todo: Default conversation id of General channel
     * else it will read from converation url
     */
    if(authenticatedUser){
      ChatAPI.getFullConversation('5b82c8d0aac209f0737b6c5e',authenticatedUser.token)
        .then(response=>{
          console.log(response);
        })
        .catch(error=>console.log(error));
    }
      
  }
  render() {
   return (
     <div>
        <div>
          {this.state.chatHistory}
        </div>
        <Input 
          type="text" name="textMessage"  
          defaultValue={this.state.textMessage}
          onChange={this.handleChange}/>
        <Button onClick={this.handleSendMessage} >Send</Button>
     </div>  
    );
  }
}
