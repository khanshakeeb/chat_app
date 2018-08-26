// Schema for storing message against each conversation _id
// conversation can have multiple user messages
// type e.g text & media files
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
      },
      body: {
        type: String,
        required: true
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      messageType:{
        type: String,
        default: 'text' 
      }
},{timestamps: true});

module.exports = mongoose.model('Message', messageSchema);