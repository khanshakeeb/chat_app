//Token manager for JWT
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

module.exports = {
    signJWT: (userData)=>{
        //Sign JWT user object as token
        var token = jwt.sign({user_id: userData._id, email: userData.email}, jwtConfig.jwtSecret, {expiresIn: jwtConfig.jwtexpiresIn})
        return token;
    },
    decodeJWT: (token)=>{
        //Decode JWT token to get user object
        return jwt.verify(token,jwtConfig.jwtSecret);
    }
}