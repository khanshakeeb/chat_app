const tokenManager = require('../helpers/tokenManager');
const responseHandler = require('../helpers/responseHandler');
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
        
    }
}