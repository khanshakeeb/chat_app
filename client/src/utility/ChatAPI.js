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
    getUserProfile: (id,token)=>{
        let url =`${endpoints.API}userProfile/${id}`;
        return axios.get(url,{ 
            headers:{
                'x-auth-token': token
            }
        });
    },
    startConverstation:(recipient, current,token)=>{
        console.log("chat api post",recipient, current,token);
        return axios.post(`${endpoints.API}startConversation`, {
            recipient: recipient,
            currentUser: current
        }, {
            headers:{
                'x-auth-token': token
            }
        });
       
    },
    getChatList:(token)=>{
        let url =`${endpoints.API}getChatList`;
        return axios.get(url,{ 
            headers:{
                'x-auth-token': token
            }
        });
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
    logout:(token)=>{
        let url = `${endpoints.API}signout`;
        return axios.get(url,{ 
            headers:{
                'x-auth-token':token
            }
        });
    }

};

export default ChatAPI;
