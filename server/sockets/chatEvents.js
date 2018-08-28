/**
 * Chat socket/events
 */

module.exports = function(sockIO){
    sockIO.on('connection', function(socket){
        console.log("Socket connection established!!");
        socket.on('sendMessage',(message)=>{
            console.log("message has been recieved", message);
            socket.emit('recievedMessage','i am come from socket server');
        });
        
    });

}