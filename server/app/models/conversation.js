// Schema for conversation
//types e.g private, channel
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conversationSchema = Schema({
    conversationType:  {type: String,  default: 'channel'},
    title: {type: String, default:'general',index: true},
    participants: [{ type: Schema.Types.ObjectId, ref: 'User'}]
},{timestamps: true});

module.exports = mongoose.model('Conversation', conversationSchema);