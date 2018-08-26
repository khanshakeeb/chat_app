// app/models/user.js
// load the things we need
const mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
const userSchema = mongoose.Schema({
        email: {type: String, lowercase: true, required: [true, "Email is required"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
        password: {type: String, required: [true, "Password is required"]},
        authToken: String,
        firstName: String,
        lastName: String,
        phone: String,
        displayName: String,
        aboutMe: String,
        isActive: { type: Boolean, default: false },
        isOnline: { type: Boolean, default: false },
        token: String
},{timestamps: true});

// methods ======================
// generating a hash
userSchema.methods.generateHash = (password)=> {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = (password,storedPassword)=> {
    return bcrypt.compareSync(password, storedPassword);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);