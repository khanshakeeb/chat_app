const socketHandler = require('../app/helpers/socketsHandler');
/**
 * Chat socket/events
 */
const MessageModel = require('../app/models/message');
module.exports = function (sockIO) {
    sockIO.on('connection', function (socket) {
        console.log("Socket connection established!!");
        socket.on('sendMessage', async (message) => {
            console.log("message has been recieved", message);
            try {
                let newMessage = new MessageModel(message);
                let isSaved = await newMessage.save();
                console.log("message saved", isSaved);
                socketHandler.messageThreads(socket, MessageModel, isSaved.conversationId);
            } catch (e) {
                console.log(e);
                socket.emit('onError', e);
            };

        });

        //Remove message
        socket.on('removeMessage', async (removeMessage) => {

            try {
                let isDeleted = await MessageModel.findOneAndRemove({
                    conversationId: removeMessage.conversationId,
                    author: removeMessage.authorId,
                    _id: removeMessage.messageId
                });
                console.log(isDeleted);
                if (isDeleted) socketHandler.messageThreads(socket, MessageModel, removeMessage.conversationId);
            } catch (e) {
                console.log(e);
                socket.emit('onError', e);
            }

        });


        //editMessage
        socket.on('editMessage', async (message) => {
            try {
                let isUpdated = await MessageModel.update({
                    _id: message.messageId
                }, { body: message.body });
                if (isUpdated) socketHandler.messageThreads(socket, MessageModel, message.conversationId);
            } catch (e) {
                console.log(e);
                socket.emit('onError', e);
            }
        });

    });

}