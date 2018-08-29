// app/routes.js
const passport = require('passport')
const chatBoxCtrl = require('./controllers/chatBox.js'); //Site controller 
const authCtrl = require('./controllers/auth.js'); //Auth controller 
const LocalStrategy = require('./middleware/passport');
const statusCodes = require('./config/statusCodes');
const auth = require('./middleware/isAuth');
const responseHandler = require('./helpers/responseHandler');

module.exports = function(app) {

    // =====================================
    // Passport stategy
    // =====================================
    passport.use('local-login', LocalStrategy.getLocalStartegy());
    //Attach Site Controller to Route     
    app.get('/api/v1/getChatList', chatBoxCtrl.getChatList);
    
    // =====================================
    // Authorization controllers
    // =====================================
    
    app.post('/api/v1/signin', (req, res, next)=>{
        passport.authenticate('local-login', {session: false}, (err, user, info)=>{
          if (!user) return res.json(responseHandler.errorResponse(req.__('PASSWORD_ERROR'), err, statusCodes.VALIDATION_ERROR_NOT_FIELDS));
          console.log("user object from db", user);
          return res.json(responseHandler.successResponse(
            res.__('USER_SIGNIN_SUCCESS'),
            responseHandler.generatedUserData(user,user.token)
          ));  

      })(req, res, next);
    });
    app.post('/api/v1/signup', authCtrl.signup);
    app.get('/api/v1/signout', authCtrl.logout); 
        
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    app.get('/api/v1/userProfile',auth.isAuthoriation, authCtrl.profile);  
    app.get('/api/v1/editProfile',auth.isAuthoriation, authCtrl.editProfile);  
    app.get('/api/v1/getFullConversation/:conversationId?',auth.isAuthoriation, chatBoxCtrl.getFullConversation );
};

