import * as endpoints from './endpoints';
import axios from 'axios';
import * as header from './headers';


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
    getFullConversation: (params)=>{
       let url = null;
       
       if(params.isDefault){
        url =`${endpoints.API}getFullConversation`;
       }else{
        url =`${endpoints.API}getFullConversation/${params.id}`;
       }
        
        return axios.get(url,{ 
            headers:{
                'x-auth-token': params.token
            }
        });
    },
    deleteMessage:()=>{

    },
    editMessage:()=>{

    }

};

export default ChatAPI;
