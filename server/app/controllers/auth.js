const UserModel = require('../models/user');
const responseHandler = require('../helpers/responseHandler');
const statusCodes = require('../config/statusCodes');
const tokenManager = require('../helpers/tokenManager');
const Conversation = require('../models/conversation');
module.exports = {
    signup: async(req, res)=> {
        let response = null;
        try{
            const userData = req.body;                  
            let newUser = new UserModel({
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                displayName: userData.displayName,
                aboutMe: userData.aboutMe,
                isActive: true,
                isOnline: true
            });
            newUser.password = newUser.generateHash(userData.password);       
            let isSaved = await newUser.save();
            //After new signup; sign JWT token and update user document.
            let authToken = tokenManager.signJWT(isSaved);
            let isUpdated = await UserModel.update({_id: isSaved._id},{token: authToken});
            
            if(isSaved && isUpdated){
                // assign to default chat channel e.g general
                let assignConversation = await Conversation.findOneAndUpdate({title: 'General'},
                    {$push: { participants: isSaved._id } },
                    { upsert:true });
                console.log("assign conversation", assignConversation);
                response = responseHandler.successResponse(
                    res.__('USER_SIGNUP_SUCCESS'),
                    //Generate user json response
                    responseHandler.generatedUserData(isSaved,authToken)
                );
            }
        }catch(e){
            console.log("error", e);
            response = responseHandler.errorResponse(
                res.__('USER_SIGNUP_ERROR'),
                {},
                statusCodes.BAD_REQUEST
            );
        }
        
        res.json(response);
        
    },
    logout: async(req, res)=> {
        let response = null;
        let token = req.headers['x-auth-token'];
        let decode =  tokenManager.decodeJWT(token);
        try{
            let isUpdated = await UserModel.update({_id: decode.user_id},{token: null,isOnline: false});
            if(isUpdated){
                response = responseHandler.successResponse(
                    res.__('USER_SIGNUP_LOGOUT'),
                    {}
                );
            }else{
                response = responseHandler.errorResponse(
                    res.__('USER_SIGNUP_LOGOUT_ERROR'),
                    {}
                );
            }
        }catch(e){
            console.log("react to logout method",e);
            response = responseHandler.errorResponse(
                res.__('USER_SIGNUP_LOGOUT_ERROR'),
                {}
            );
        }
              
        res.json(response);
    },
    profile: async(req, res)=> {
        let userData = res.userData;
        let response = null;
        try{
            let profile = await UserModel.findOne({_id: userData.user_id});
            response = responseHandler.successResponse(
                res.__('USER_PROFILE'),
                profile
            );
        }catch(e){
            console.log(e);
            response = responseHandler.errorResponse(
                res.__('USER_PROFILE_ERROR'),
                {}
            );
        }
        
        res.json(response);
    },
    editProfile: (req, res)=>{
        /**
         * @todo: Update user profile after login the application
         */
    }
};

