
const LocalStrategy   = require('passport-local').Strategy;
const UserModel            = require('../models/user');
const tokenManager = require('../helpers/tokenManager');
const statusCodes = require('../config/statusCodes');
module.exports =  {
    getLocalStartegy: ()=>{
        return new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => { 
       
        try{
           // const userModel = new UserModel();
            let user = await UserModel.findOne({email:email});
            console.log("users from db", user);
            if(user.validPassword(password,user.password)){
                console.log("password matched!!");
                let authToken = tokenManager.signJWT(user);
                let isUpdated = await UserModel.update({_id: user._id},{token: authToken});
                return isUpdated ? done(null, user):done(null, false, statusCodes.ERROR_AUTH_USER_PASSWORD); 
            }else{
                return done(null, false, statusCodes.ERROR_AUTH_USER_PASSWORD);    
            }
            
        }catch(e){
            console.log(e);
            return done(null, false, statusCodes.ERROR_AUTH_USER_PASSWORD);
        }
        
     });
   }
};