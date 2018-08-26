//User seed data for the applicaiton
const seeder = require('mongoose-seed');
const dbConfig = require('../app/config/database');
const ConversationModel = require('../app/models/conversation');
const UserModel = require('../app/models/user');
seeder.connect(dbConfig.url, ()=> {
 
  // Load Mongoose models
  seeder.loadModels([
    './app/models/conversation',
    './app/models/message'
  ]);
// Clear specified collections
    seeder.clearModels(['Conversation','Message'], async()=> {
        let users = await UserModel.find({});
        
        let participants = users.map((item)=>{
            return item._id;
        });
        let conversationData = {
            title: 'General',
            type: 'channel',
            participants:participants
        }
        const conversation = await ConversationModel.create(conversationData);
        const messageData = _generateMessageData(users,conversation);
        seeder.populateModels(messageData, function() {
          seeder.disconnect();
        });
       
    });
});


function _generateMessageData(users,conversation){
    let messages = [];
    messages = users.map( item=>{
        return {
            conversationId: conversation._id,
            body: "I have joined General channel",
            author:  item._id,
            messageType:'text'
        };
    });
    console.log("Messages ", messages);
    const data = [
        {
            'model': 'Message',
            'documents': messages
        }
    ];

    return data;
}




