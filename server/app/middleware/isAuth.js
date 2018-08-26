const tokenManager = require('../helpers/tokenManager');

module.exports = {
    isAuthoriation: (req, res, next)=>{
        try{
            let token = req.headers['x-auth-token'];
            let decoded = tokenManager.decodeJWT(token);
            res.userData = decoded;
            return next();
        }catch(e){
            console.log(e);
            return next(err)
        }
        
    }
}