import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button, Input, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import chatSocket from '../utility/socket';
import ChatAPI from '../utility/chatAPI';
import appLocalStorage from '../utility/appLocalStorage';
import ChatList from '../components/ChatList';


const messageItemStyle = {  
  border: `2px solid #dedede`,
  backgroundColor:` #f1f1f1`,
  borderRadius: `5px`,
  padding: `10px`,
  margin: `10px 0`,

};

const listStyle = {
  listStyleType: `none`
}

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [],
      conversationInfo: {},
      textMessage: '',
      editMessage:{},
      editMode: false,
      socketError: null
    };
  
    chatSocket.recievedMessage((data) => {
        switch(data.action){
          case 'newMessage':
            let prevMesssage = this.state.chatHistory;
            prevMesssage.push(data.message);
            this.setState({ chatHistory: prevMesssage, textMessage: '' });
          break;     
          default:
          this.setState({ chatHistory: data.message, textMessage: '' });
        }  
    });
    //Error handler
    chatSocket.errorHandler((error)=>{
      this.setState({socketError: error});
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
  }
 

  editMessage(message){
    this.setState({
      editMessage: message,
      textMessage: message.body,
      editMode: true
    });
  }
  deleteMessage(messageId,authorId){
    chatSocket.deleteMessage({messageId,authorId,conversationId: this.state.conversationInfo._id});
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSendMessage() {
    this.setState({ textMessage: ' ' });
    let authenticatedUser = appLocalStorage.get('authenticatedUser');
    let messageObject = {};
    const {editMessage,editMode} =  this.state;
    /**
     * @todo: Need to optimize edit/delete algorithm
     */
   if(editMode){
    messageObject = {
      conversationId: this.state.conversationInfo._id,
      messageId: editMessage._id, 
      body: this.state.textMessage,
      author: authenticatedUser.userId,
      messageType: 'text'
    };

    console.log("edit mesage", editMessage);
    this.setState({editMessage:null,editMode: false});
    chatSocket.editMessage(messageObject);
   }else{
    messageObject = {
      conversationId: this.state.conversationInfo._id,
      body: this.state.textMessage,
      author: authenticatedUser.userId,
      messageType: 'text'
    };
    console.log("new mesage", messageObject);
    chatSocket.sendMessage(messageObject);
   }
   

  }

  componentDidMount() {
    const { params } = this.props.match;
    let authenticatedUser = appLocalStorage.get('authenticatedUser');
    let where = {
      token: authenticatedUser.token,
      id: null,
      isDefault: false
    }

   

    if (authenticatedUser && typeof params.id !== 'undefined') {
      where['isDefault'] = false;
      where['id'] = params.id;
    } else {
      console.log("param id is undefined");
      where['isDefault'] = true;
    }

    ChatAPI.getFullConversation(where)
      .then(response => {
        const { conversation, messages } = response.data.data;
        this.setState({
          chatHistory: messages,
          conversationInfo: conversation,
        });
      })
      .catch(error => console.log(error));

  }
  render() {
    /**
     * @todo: 1.Refactor component and break down into smaller one
     * 2. fetch chat list 
     * 3. generate private chat converstation id
     * 4. theme component
     */
    const { conversationInfo } = this.state;
    let authenticatedUser = appLocalStorage.get('authenticatedUser');
    let chatHeading = (<h1>Private Message</h1>);
    if (conversationInfo && conversationInfo.conversationType === 'channel') {
      chatHeading = (<h1>#General</h1>);
    }
    return (
      <Row>
        <Col sm="4">
          <ChatList></ChatList>
       </Col>
        <Col sm="8">
          <div className='recent-chat'>
            {chatHeading}
          </div>
          <div className="chat-box">
            <div className='chat-history'>
              <ul style={listStyle}>
              {this.state.chatHistory.map(message => {
                const actionButton = [];
                if(message.author._id === authenticatedUser.userId){
                  actionButton.push(
                    <div key={`action-${message._id}`}>
                      <span><Button color="link" onClick={()=>this.editMessage(message)}>edit</Button></span>
                      <span><Button color="link" onClick={()=>this.deleteMessage(message._id,authenticatedUser.userId)}>delete</Button></span>
                    </div>
                  );
                } 
                return (
                  <li key={`message-${message._id}`} style={messageItemStyle} >
                    
                    <p>
                        <Link to={`/profile/${message.author._id}`}>{message.author.firstName} {message.author.lastName}</Link>
                        <span className='time'> ({message.createdAt})</span>
                    </p>
                    <p>{message.body}</p>
                    {actionButton}
                  </li>
                );
              })
              }
              </ul>
            </div>
            <InputGroup>
              <Input
                type="text" name="textMessage"
                value={this.state.textMessage}
                onChange={this.handleChange} />
              <InputGroupAddon addonType="append">
                <Button onClick={this.handleSendMessage} color="success" disabled={!this.state.textMessage} >Send</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </Col>
      </Row>
    );
  }
}
