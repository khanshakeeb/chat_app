import React, { Component } from 'react';
import appLocalStorage from '../utility/appLocalStorage';
import { Button,Input } from 'reactstrap';
import chatSocket from '../utility/socket';
import ChatAPI from '../utility/chatAPI';

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
