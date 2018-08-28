import * as endpoints from './endpoints';
import axios from 'axios';
const ChatAPI = {
    login:  (form)=>{
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
        return axios.post(`${endpoints.API}signin`, {
            email: form.email,
            password: form.password
          },headers);
              
     
    },
    signup: ()=>{

    },
    getProfile: ()=>{

    },
    sendMessage:()=>{

    },
    listChats:()=>{

    },
    getFullConversation: ()=>{

    },
    deleteMessage:()=>{

    },
    editMessage:()=>{

    }

};

export default ChatAPI;
