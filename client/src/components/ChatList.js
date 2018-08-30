import React, { Component } from 'react';
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
    if(!chatList) return <p>There is no active chat list</p>;
    return (
        <div>
          <h1>Recent Chats</h1>
          {chatList.map((listItem)=>{            
            return(
              <div key={`chat-${listItem._id}`}><p><Link to={`/chat/messages/${listItem._id}`}>{listItem.title}</Link></p></div>
            );
          })}
        </div>
           
    );
  }
}
