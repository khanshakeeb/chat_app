const tokenManager = require('../helpers/tokenManager');
const responseHandler = require('../helpers/responseHandler');
const UserModel = require('../models/user');
module.exports = {
    isAuthorization: (req, res, next)=>{
        try{
            let token = req.headers['x-auth-token'];
            console.log("token header", token);
            let decoded = tokenManager.decodeJWT(token);
            res.userData = decoded;
            return next();
        }catch(e){
            console.log(e);
            res.json(responseHandler.errorResponse(
                e.message,
                e
            ));
        }
        
    },
    isAlreadyExists : async(req,res,next)=>{
        let userData = req.body;
        console.log("post body", userData)
        try{
            let isUser = await UserModel.findOne({email: userData.email });
            console.log("User already exists", isUser);
            if(isUser){
                res.json(responseHandler.errorResponse(
                    res.__('USER_EXISTS'),                 
                    {}
                ));
                
            }else{
                return next();
            }
            
        }catch(e){
            console.log(e);
            res.json(responseHandler.errorResponse(
                e.message,
                e
            ));
        }
    }
}