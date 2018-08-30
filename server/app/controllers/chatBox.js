const ConversationModel = require('../models/conversation');
const responseHandler = require('../helpers/responseHandler');
const statusCodes = require('../config/statusCodes');
const MessageModel = require('../models/message');
const chatBox = {
    getChatList: async(req, res)=> {
        let user = res.userData;
        let response = null;
        try{
            let chatList = await ConversationModel.find({participants:user.user_id});
            response = responseHandler.successResponse(
                res.__('CHAT_LIST'),
                chatList
            );
        }catch(e){
            console.log("error", e);
            response = responseHandler.errorResponse(
                res.__('CHAT_LIST_ERROR'),
                {},
                statusCodes.BAD_REQUEST
            );
        };
         res.json(response); 
    },
    getFullConversation: async (req, res)=>{
        let conversations = null;
        let messages = null;
        let response = null;
        let where = null;
        if(typeof req.params.conversationId !== 'undefined'){
            console.log("param id is ", req.params.conversationId);
            where = {_id: req.params.conversationId};
        }else{
            console.log("default general messages");
            where = {title: 'General', conversationType:'channel'};
        }
        try{
            conversations = await ConversationModel.findOne(where)
            .select("title conversationType participants")
            .sort('-createdAt')
            .populate({
                path: 'participants',
                select: 'firstName lastName displayName'
            });

            messages = await MessageModel.find({conversationId: conversations._id})
            .select("createdAt body author")
            .sort({createdAt:'asc'})
            .populate({
                path: 'author',
                select: 'firstName lastName displayName'
            });

            response = responseHandler.successResponse(
                res.__('Full_CONVERSATOIN'),
                //Generate user json response
                {conversation: conversations, messages: messages}
            );
        }catch(e){
            console.log("error", e);
            response = responseHandler.errorResponse(
                res.__('Full_CONVERSATOIN_ERROR'),
                {},
                statusCodes.BAD_REQUEST
            );
        }
        
        res.json(response);
    }
};

module.exports = chatBox;