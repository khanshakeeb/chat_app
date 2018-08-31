import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {Link} from "react-router-dom";
import ChatAPI from '../utility/chatAPI';
import appLocalStorage from '../utility/appLocalStorage';

export default class ChatList extends Component {
  constructor(props){
    super(props);
    this.state = {
      chatList:[]
    };
  }
  componentDidMount(){
    let currentUser = appLocalStorage.get('authenticatedUser');
    ChatAPI.getChatList(currentUser.token).then((chatList)=>{
      const {data} = chatList.data;
      this.setState({chatList: data});
    }).catch(e=>console.log(e));
  }
  render() {
    const {chatList} = this.state;
    let currentUser = appLocalStorage.get('authenticatedUser');
    if(chatList.length === 0) return <p>There is no active chat list</p>;
    return (
        <div>
          <h1>Recent Chats</h1>
          <ListGroup>          
          {chatList.map((listItem)=>{     
            let title = `#${listItem.title}`;
            if(listItem.conversationType === 'private'){
                let oppositeRecipient = listItem.participants.find((user)=>{
                    return user._id !== currentUser.userId;
                });
                console.log("oppositeRecipient",oppositeRecipient);
                title = `${oppositeRecipient.firstName} ${oppositeRecipient.lastName}`;
            }
            {/*<div key={`chat-${listItem._id}`}><p><Link to={`/chat/messages/${listItem._id}`}>{title}</Link></p></div>*/}
            return(
              <ListGroupItem key={`chat-${listItem._id}`} tag="a" href={`/chat/messages/${listItem._id}`}>{title}</ListGroupItem>
            );
          })}
          </ListGroup>
        </div>
           
    );
  }
}
