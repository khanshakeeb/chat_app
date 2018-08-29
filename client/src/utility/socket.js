//Socket client
import io from 'socket.io-client';
import * as endpoints from './endpoints';

const openSocket = io(endpoints.openSocket);

module.exports = {
    sendMessage: (message)=>{
        openSocket.emit('sendMessage',message);
    },
    recievedMessage:(cb)=>{
        openSocket.on('recievedMessage',(message)=>cb(message));
    },
    deleteMessage:(removeMessage)=>{

        openSocket.emit('removeMessage',removeMessage);
    },
    editMessage:(message)=>{
        openSocket.emit('editMessage',message);
    }
}
