const ConversationModel = require('../models/conversation');
const responseHandler = require('../helpers/responseHandler');
const statusCodes = require('../config/statusCodes');
const MessageModel = require('../models/message');
const chatBox = {
    getChatList: (req, res)=> {
         res.json({data:'applicaiton loaded!!!'}); // load the index.ejs file
    },
    getFullConversation: async (req, res)=>{
        let conversationId = req.params.conversationId;
        let conversations = null;
        let messages = null;
        let response = null;
        try{
            conversations = await ConversationModel.findOne({_id: conversationId})
            .select("title conversationType participants")
            .sort('-createdAt')
            .populate({
                path: 'participants',
                select: 'firstName lastName displayName'
            });

            messages = await MessageModel.find({conversationId: conversations._id})
            .select("createdAt body author")
            .sort('-createdAt')
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