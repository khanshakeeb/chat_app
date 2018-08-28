import * as endpoints from './endpoints';
import axios from 'axios';
import * as header from '../utility/headers';
const ChatAPI = {
    login:  (form)=>{
        return axios.post(`${endpoints.API}signin`, {
            email: form.email,
            password: form.password
          },header.values);
              
     
    },
    signup: (form)=>{
        return axios.post(`${endpoints.API}signup`, {
            email: form.email,
            password: form.password,
            firstName:form.firstName,
            lastName: form.lastName,
            phone:form.phone,
            aboutMe:form.aboutMe
          },header.values);
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
