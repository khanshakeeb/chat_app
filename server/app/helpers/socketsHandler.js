
//Socket handler
module.exports = {
    messageThreads : async(socket,MessageModel,conversationId)=>{        
        let messageThread = await MessageModel.find({conversationId: conversationId})
        .select("createdAt body author")
        .sort({createdAt:'asc'})
        .populate({
            path: 'author',
            select: 'firstName lastName displayName'
        });
       
        socket.emit('recievedMessage', {
            message:messageThread, 
            action:'chatHistory',
        });
    },
    recentMessage: async(socket,MessageModel,messageId)=>{
        let latestMessage = await MessageModel.findOne({_id: messageId})
        .select("createdAt body author")
        .sort({createdAt:'asc'})
        .populate({
            path: 'author',
            select: 'firstName lastName displayName'
        });
        socket.emit('recievedMessage',{
            message:latestMessage, 
            action:'newMessage',
        });
    }
}